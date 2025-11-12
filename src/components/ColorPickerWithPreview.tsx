import type { Colord } from 'colord';
import type { ReactNode } from 'react';
import { Grid, Stack, VisuallyHidden } from '../../styled-system/jsx';
import { ColorPicker } from './ColorPicker';
import { ColorSwatch } from './ColorSwatch';

// TODO: Click on the base color swatch should set this color

/** Color picker with a preview swatches of the current and base colors. */
export function ColorPickerWithPreview({
  label,
  color,
  baseColor,
  onChange,
}: {
  label: ReactNode;
  color: Colord;
  baseColor: Colord;
  onChange: (color: Colord) => void;
}) {
  return (
    <Stack gap="s" height="100%">
      <VisuallyHidden as="h3">{label}</VisuallyHidden>
      <Grid
        gridTemplateColumns="1fr 1fr"
        border="1px solid"
        borderColor="lightBorder"
        borderRadius="base"
        overflow="hidden"
      >
        <ColorSwatch color={baseColor.toHex()} />
        <ColorSwatch color={color.toHex()} />
      </Grid>
      <ColorPicker color={color} onChange={onChange} />
    </Stack>
  );
}
