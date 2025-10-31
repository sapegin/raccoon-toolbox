import { Box } from './Box';

export function ColorSwatch({ color }: { color: string }) {
  return <Box height="6rem" style={{ backgroundColor: color }} />;
}
