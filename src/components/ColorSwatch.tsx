import { Box } from '../../styled-system/jsx/box';

export function ColorSwatch({ color }: { color: string }) {
  return <Box height="6rem" style={{ backgroundColor: color }} />;
}
