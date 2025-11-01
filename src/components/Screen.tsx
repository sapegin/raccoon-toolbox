import type { GridProps } from '../../styled-system/jsx';
import { Grid } from './Grid';

export function Screen(props: GridProps) {
  return <Grid {...props} height="100%" gap="m" p="s" pr="m" />;
}
