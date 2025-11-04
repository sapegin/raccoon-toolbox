import { type Colord, colord } from 'colord';
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type HTMLProps,
} from 'react';
import { Box } from './Box';
import { Grid } from './Grid';

interface ColorPickerProps {
  color: Colord;
  onChange: (color: Colord) => void;
}

function DragHandle({
  variant = 'rectangle',
  style,
}: {
  variant?: 'circle' | 'rectangle';
  style: HTMLProps<HTMLDivElement>['style'];
}) {
  return (
    <Box
      position="absolute"
      border="2px solid #fff"
      outline="1px solid #000"
      boxShadow="0 0 3px #000c"
      pointerEvents="none"
      {...(variant === 'circle'
        ? {
            width: '0.75rem',
            height: '0.75rem',
            borderRadius: '100%',
          }
        : {
            mx: '-0.2rem',
            width: 'calc(100% + 0.4rem)',
            height: '0.3rem',
            borderRadius: 'base',
            backgroundColor: '#fff',
          })}
      style={{
        ...style,
        transform:
          variant === 'circle' ? 'translate(-50%, -50%)' : 'translateY(-50%)',
      }}
    />
  );
}

/**
 * Color picker with areas to select saturation/brightness, hue, and alpha
 * channel.
 */
export function ColorPicker({ color, onChange }: ColorPickerProps) {
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
    <Grid gridTemplateColumns="1fr 2rem 2rem" gap="m" height="100%">
      <Box
        ref={saturationValueRef}
        position="relative"
        cursor="crosshair"
        border="1px solid"
        borderColor="lightBorder"
        borderRadius="base"
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
      </Box>
      <Box
        ref={hueRef}
        position="relative"
        cursor="ns-resize"
        border="1px solid"
        borderColor="lightBorder"
        borderRadius="base"
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
      </Box>
      <Box
        ref={alphaRef}
        position="relative"
        cursor="ns-resize"
        border="1px solid"
        borderColor="lightBorder"
        borderRadius="base"
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
      </Box>
    </Grid>
  );
}
