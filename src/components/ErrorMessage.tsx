import { Box, type BoxProps } from '../../styled-system/jsx/box';

export function ErrorMessage({ children, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      color="errorForeground"
      backgroundColor="textBackground"
      whiteSpace="pre-wrap"
      fontFamily="code"
    >
      {children}
    </Box>
  );
}
