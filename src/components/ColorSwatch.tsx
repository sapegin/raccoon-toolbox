import { Box } from './Box';

export function ColorSwatch({ color }: { color: string }) {
  return (
    <Box
      border="1px solid"
      borderColor="lightBorder"
      height="6rem"
      style={{ backgroundColor: color }}
    />
  );
}
