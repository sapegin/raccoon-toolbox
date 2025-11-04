import type { GridProps } from '../../styled-system/jsx';
import { Grid } from './Grid';

export function Screen(props: GridProps) {
  return <Grid gap="m" {...props} height="100%" p="s" cursor="default" />;
}
