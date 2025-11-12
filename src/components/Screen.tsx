import type { GridProps } from '../../styled-system/jsx';
import { Grid } from '../../styled-system/jsx/grid';

export function Screen(props: GridProps) {
  return <Grid gap="m" {...props} height="100%" cursor="default" />;
}
