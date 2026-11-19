import { type Colord, colord } from 'colord';
import { type ReactNode, useCallback, useState } from 'react';
import { canPickScreenColor, pickScreenColor } from '../util/pickScreenColor';
import { Button } from './Button';
import { ColorPicker } from './ColorPicker';
import { ColorSwatch } from './ColorSwatch';

// TODO: Click on the base color swatch should set this color

/** Color picker with a preview swatches of the current and base colors. */
export function ColorPickerWithPreview({
  label,
  color,
  baseColor,
  onChange,
  onScreenColor,
  showAlpha,
}: {
  label: ReactNode;
  color: Colord;
  baseColor: Colord;
  onChange: (color: Colord) => void;
  /** Called when a screen color is picked; defaults to `onChange`. */
  onScreenColor?: (color: Colord) => void;
  showAlpha?: boolean;
}) {
  const [isPicking, setIsPicking] = useState(false);
  const showEyedropper = canPickScreenColor();

  const handlePickFromScreen = useCallback(() => {
    const pick = async () => {
      setIsPicking(true);
      try {
        const hex = await pickScreenColor();
        if (hex) {
          (onScreenColor ?? onChange)(colord(hex));
        }
      } finally {
        setIsPicking(false);
      }
    };
    void pick();
  }, [onChange, onScreenColor]);

  return (
    <div className="flex h-full flex-col gap-2">
      <h3 className="sr-only">{label}</h3>
      {showEyedropper && (
        <Button
          className="self-end"
          onClick={handlePickFromScreen}
          disabled={isPicking}
        >
          Pick color
        </Button>
      )}
      <div className="rounded-normal border-light-border grid grid-cols-2 overflow-hidden border border-solid">
        <ColorSwatch color={baseColor.toHex()} />
        <ColorSwatch color={color.toHex()} />
      </div>
      <ColorPicker color={color} onChange={onChange} showAlpha={showAlpha} />
    </div>
  );
}
