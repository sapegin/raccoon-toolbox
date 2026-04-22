import type { Colord } from 'colord';
import type { ReactNode } from 'react';
import { ColorPicker } from './ColorPicker';
import { ColorSwatch } from './ColorSwatch';

// TODO: Click on the base color swatch should set this color

/** Color picker with a preview swatches of the current and base colors. */
export function ColorPickerWithPreview({
  label,
  color,
  baseColor,
  onChange,
  showAlpha,
}: {
  label: ReactNode;
  color: Colord;
  baseColor: Colord;
  onChange: (color: Colord) => void;
  showAlpha?: boolean;
}) {
  return (
    <div className="flex h-full flex-col gap-2">
      <h3 className="sr-only">{label}</h3>
      <div
        className="
          grid grid-cols-2 overflow-hidden rounded-normal border border-solid
          border-light-border
        "
      >
        <ColorSwatch color={baseColor.toHex()} />
        <ColorSwatch color={color.toHex()} />
      </div>
      <ColorPicker color={color} onChange={onChange} showAlpha={showAlpha} />
    </div>
  );
}
