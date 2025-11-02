import { useState, useCallback, useEffect } from 'react';
import { colord, type Colord } from 'colord';
import { Grid } from '../components/Grid';
import { Button } from '../components/Button';
import { VisuallyHidden } from '../../styled-system/jsx';
import { usePersistentState } from '../hooks/usePersistentState';
import { Stack } from '../components/Stack';
import { Input } from '../components/Input';
import { ColorPicker } from '../components/ColorPicker';
import { CopyButton } from '../components/CopyButton';
import { ColorSwatch } from '../components/ColorSwatch';
import { Screen } from '../components/Screen';

const defaultColorHex = '#fa8072';
const defaultColorRgb = 'rgba(250, 128, 114)';

function parseColorInput(input: string): Colord | null {
  const trimmed = input.trim();
  if (trimmed === '') {
    return null;
  }

  // Try parsing as-is
  let parsed = colord(trimmed);
  if (parsed.isValid()) {
    return parsed;
  }

  // Try with # prefix for hex
  if (/^[0-9a-f]{3,8}$/i.test(trimmed)) {
    parsed = colord(`#${trimmed}`);
    if (parsed.isValid()) {
      return parsed;
    }
  }

  // Try as RGB values
  const rgbMatch = trimmed.match(/^(\d+),\s*(\d+),\s*(\d+)$/);
  if (rgbMatch) {
    parsed = colord({
      r: Number.parseInt(rgbMatch[1]),
      g: Number.parseInt(rgbMatch[2]),
      b: Number.parseInt(rgbMatch[3]),
    });
    if (parsed.isValid()) {
      return parsed;
    }
  }

  // Try as RGBA values
  const rgbaMatch = trimmed.match(/^(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)$/);
  if (rgbaMatch) {
    parsed = colord({
      r: Number.parseInt(rgbaMatch[1]),
      g: Number.parseInt(rgbaMatch[2]),
      b: Number.parseInt(rgbaMatch[3]),
      a: Number.parseFloat(rgbaMatch[4]),
    });
    if (parsed.isValid()) {
      return parsed;
    }
  }

  return null;
}

function Output({ label, value }: { label: string; value: string }) {
  return (
    <Input
      id={label.toLowerCase()}
      label={label}
      value={value}
      readOnly
      actions={<CopyButton value={value} />}
    />
  );
}

export function ColorConverter() {
  const [input, setInput] = usePersistentState(
    'colorConverter.input',
    defaultColorHex
  );
  const [color, setColor] = useState<Colord>(() => {
    const parsed = parseColorInput(input);
    return parsed ?? colord(defaultColorHex);
  });
  const [baseColor, setBaseColor] = useState<Colord>(color);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (input !== '') {
      handleInputChange(input);
    }
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    const parsed = parseColorInput(value);
    if (parsed) {
      setColor(parsed);
      setBaseColor(parsed);
      setErrorMessage('');
    } else if (value.trim() === '') {
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid color format');
    }
  }, []);

  const handleColorPickerChange = useCallback((newColor: Colord) => {
    setColor(newColor);
    setInput(newColor.toHex());
    setErrorMessage('');
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setColor(colord(defaultColorHex));
    setErrorMessage('');
  }, []);

  const hex = color.toHex();
  const rgb = color.toRgb();
  const hsl = color.toHsl();

  return (
    <Screen gridTemplateColumns="20rem 1fr">
      <Stack gap="m">
        <VisuallyHidden as="h3">Input</VisuallyHidden>
        <Input
          id="input"
          label="Input"
          placeholder={`Try “${defaultColorHex}” or “${defaultColorRgb}”`}
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          errorMessage={errorMessage}
          actions={
            <Button onClick={handleClear} disabled={input === ''}>
              Clear
            </Button>
          }
        />
        <VisuallyHidden as="h3">Output</VisuallyHidden>
        <Output label="Hex" value={hex} />
        <Output label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
        <Output
          label="RGBA"
          value={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a.toFixed(2)})`}
        />
        <Output
          label="HSL"
          value={`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`}
        />
        <Output
          label="HSLA"
          value={`hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${hsl.a.toFixed(2)})`}
        />
      </Stack>
      <Stack gap="s">
        <VisuallyHidden as="h3">Color picker</VisuallyHidden>
        <Grid
          gridTemplateColumns="1fr 1fr"
          border="1px solid"
          borderColor="lightBorder"
          borderRadius="base"
          overflow="hidden"
        >
          <ColorSwatch color={baseColor.toHex()} />
          <ColorSwatch color={hex} />
        </Grid>
        <ColorPicker color={color} onChange={handleColorPickerChange} />
      </Stack>
    </Screen>
  );
}
