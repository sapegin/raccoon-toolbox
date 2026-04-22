import { type Colord, colord } from 'colord';
import {
  type HTMLProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface ColorPickerProps {
  color: Colord;
  onChange: (color: Colord) => void;
  showAlpha?: boolean;
}

function DragHandle({
  variant = 'rectangle',
  style,
}: {
  variant?: 'circle' | 'rectangle';
  style: HTMLProps<HTMLDivElement>['style'];
}) {
  if (variant === 'circle') {
    return (
      <div
        className="
          pointer-events-none absolute size-3 rounded-full border-2
          border-[white] shadow-[0_0_3px_#000c] outline outline-[black]
        "
        style={{
          ...style,
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }
  return (
    <div
      className="
        pointer-events-none absolute -mx-[0.2rem] h-[0.3rem]
        w-[calc(100%+0.4rem)] rounded-normal border-2 border-[white] bg-[white]
        shadow-[0_0_3px_#000c] outline outline-[black]
      "
      style={{
        ...style,
        transform: 'translateY(-50%)',
      }}
    />
  );
}

/**
 * Color picker with areas to select saturation/brightness, hue, and alpha
 * channel.
 */
export function ColorPicker({
  color,
  onChange,
  showAlpha = true,
}: ColorPickerProps) {
  const saturationValueRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);
  const [isDraggingSaturationValue, setIsDraggingSaturationValue] =
    useState(false);
  const [isDraggingHue, setIsDraggingHue] = useState(false);
  const [isDraggingAlpha, setIsDraggingAlpha] = useState(false);

  const hsv = color.toHsv();
  const { h, s, v, a = 1 } = hsv;

  const updateSaturationValue = useCallback(
    (clientX: number, clientY: number) => {
      if (saturationValueRef.current === null) {
        return;
      }
      const rect = saturationValueRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      const nextSaturation = (x / rect.width) * 100;
      const nextValue = 100 - (y / rect.height) * 100;
      onChange(colord({ h, s: nextSaturation, v: nextValue, a }));
    },
    [h, a, onChange]
  );

  const updateHue = useCallback(
    (clientY: number) => {
      if (hueRef.current === null) {
        return;
      }
      const rect = hueRef.current.getBoundingClientRect();
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      const nextHue = (y / rect.height) * 360;
      onChange(colord({ h: nextHue, s, v, a }));
    },
    [s, v, a, onChange]
  );

  const updateAlpha = useCallback(
    (clientY: number) => {
      if (alphaRef.current === null) {
        return;
      }
      const rect = alphaRef.current.getBoundingClientRect();
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      const nextAlpha = 1 - y / rect.height;
      onChange(colord({ h, s, v, a: nextAlpha }));
    },
    [h, s, v, onChange]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSaturationValue) {
        updateSaturationValue(e.clientX, e.clientY);
      }
      if (isDraggingHue) {
        updateHue(e.clientY);
      }
      if (isDraggingAlpha) {
        updateAlpha(e.clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingSaturationValue(false);
      setIsDraggingHue(false);
      setIsDraggingAlpha(false);
    };

    if (isDraggingSaturationValue || isDraggingHue || isDraggingAlpha) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [
    isDraggingSaturationValue,
    isDraggingHue,
    isDraggingAlpha,
    updateSaturationValue,
    updateHue,
    updateAlpha,
  ]);

  const baseHue = colord({ h, s: 100, l: 50 }).toHex();

  return (
    <div
      className="grid h-full gap-4"
      style={{
        gridTemplateColumns: showAlpha ? '1fr 2rem 2rem' : '1fr 2rem',
      }}
    >
      <div
        ref={saturationValueRef}
        className="
          relative cursor-crosshair rounded-normal border border-solid
          border-light-border
        "
        onMouseDown={(e) => {
          setIsDraggingSaturationValue(true);
          updateSaturationValue(e.clientX, e.clientY);
        }}
        style={{
          background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${baseHue})`,
        }}
      >
        <DragHandle
          variant="circle"
          style={{ left: `${s}%`, top: `${100 - v}%` }}
        />
      </div>
      <div
        ref={hueRef}
        className="
          relative cursor-ns-resize rounded-normal border border-solid
          border-light-border
        "
        onMouseDown={(e) => {
          setIsDraggingHue(true);
          updateHue(e.clientY);
        }}
        style={{
          background:
            'linear-gradient(to bottom, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
        }}
      >
        <DragHandle style={{ top: `${(h / 360) * 100}%` }} />
      </div>
      {showAlpha && (
        <div
          ref={alphaRef}
          className="
            relative cursor-ns-resize rounded-normal border border-solid
            border-light-border
          "
          onMouseDown={(e) => {
            setIsDraggingAlpha(true);
            updateAlpha(e.clientY);
          }}
          style={{
            background: `linear-gradient(to bottom, ${color.toRgbString()}, transparent),
            repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 10px 10px`,
          }}
        >
          <DragHandle style={{ top: `${(1 - a) * 100}%` }} />
        </div>
      )}
    </div>
  );
}
