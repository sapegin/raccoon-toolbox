import { Box, type BoxProps } from './Box';

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
