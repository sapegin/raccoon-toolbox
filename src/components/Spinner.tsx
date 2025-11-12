import { Box } from '../../styled-system/jsx/box';

export function Spinner() {
  return (
    <Box
      width="2rem"
      height="2rem"
      border="3px solid"
      borderColor="lightBorder"
      borderTopColor="accent"
      borderRadius="100%"
      animation="spin 2s linear infinite"
    />
  );
}
