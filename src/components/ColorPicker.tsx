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
      boxShadow="0 0 0 1px #0009"
      pointerEvents="none"
      {...(variant === 'circle'
        ? {
            width: '0.75rem',
            height: '0.75rem',
            borderRadius: '100%',
          }
        : {
            width: '100%',
            height: '3px',
          })}
      style={{
        ...style,
        transform:
          variant === 'circle' ? 'translate(-50%, -50%)' : 'translateY(-50%)',
      }}
    />
  );
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const saturationLightnessRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);
  const [isDraggingSaturationLightness, setIsDraggingSaturationLightness] =
    useState(false);
  const [isDraggingHue, setIsDraggingHue] = useState(false);
  const [isDraggingAlpha, setIsDraggingAlpha] = useState(false);

  const hsl = color.toHsl();
  const { h, s, l, a = 1 } = hsl;

  const updateSaturationLightness = useCallback(
    (clientX: number, clientY: number) => {
      if (saturationLightnessRef.current === null) {
        return;
      }
      const rect = saturationLightnessRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      const nextSaturation = (x / rect.width) * 100;
      const nextLightness = 100 - (y / rect.height) * 100;
      onChange(colord({ h, s: nextSaturation, l: nextLightness, a }));
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
      onChange(colord({ h: nextHue, s, l, a }));
    },
    [s, l, a, onChange]
  );

  const updateAlpha = useCallback(
    (clientY: number) => {
      if (alphaRef.current === null) {
        return;
      }
      const rect = alphaRef.current.getBoundingClientRect();
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      const nextAlpha = 1 - y / rect.height;
      onChange(colord({ h, s, l, a: nextAlpha }));
    },
    [h, s, l, onChange]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSaturationLightness) {
        updateSaturationLightness(e.clientX, e.clientY);
      }
      if (isDraggingHue) {
        updateHue(e.clientY);
      }
      if (isDraggingAlpha) {
        updateAlpha(e.clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingSaturationLightness(false);
      setIsDraggingHue(false);
      setIsDraggingAlpha(false);
    };

    if (isDraggingSaturationLightness || isDraggingHue || isDraggingAlpha) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [
    isDraggingSaturationLightness,
    isDraggingHue,
    isDraggingAlpha,
    updateSaturationLightness,
    updateHue,
    updateAlpha,
  ]);

  const baseHue = colord({ h, s: 100, l: 50 }).toHex();

  return (
    <Grid gridTemplateColumns="1fr 2rem 2rem" gap="m" height="100%">
      <Box
        ref={saturationLightnessRef}
        position="relative"
        cursor="crosshair"
        border="1px solid"
        borderColor="lightBorder"
        onMouseDown={(e) => {
          setIsDraggingSaturationLightness(true);
          updateSaturationLightness(e.clientX, e.clientY);
        }}
        style={{
          background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${baseHue})`,
        }}
      >
        <DragHandle
          variant="circle"
          style={{ left: `${s}%`, top: `${100 - l}%` }}
        />
      </Box>
      <Box
        ref={hueRef}
        position="relative"
        cursor="ns-resize"
        border="1px solid"
        borderColor="lightBorder"
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
