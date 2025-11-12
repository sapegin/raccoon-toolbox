import { Grid, type GridProps } from '../../styled-system/jsx';

export function Screen(props: GridProps) {
  return <Grid gap="m" {...props} height="100%" cursor="default" />;
}
