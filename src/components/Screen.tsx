import { Grid, type GridProps } from '../../styled-system/jsx';

export function Screen(props: GridProps) {
  return (
    <Grid
      gap={{ base: 0, desktop: 's' }}
      {...props}
      height="100%"
      cursor="default"
    />
  );
}
