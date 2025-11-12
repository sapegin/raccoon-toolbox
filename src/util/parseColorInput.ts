import { type Colord, colord } from 'colord';

export function parseColorInput(input: string): Colord | undefined {
  const trimmed = input.trim();
  if (trimmed === '') {
    return undefined;
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

  return undefined;
}
