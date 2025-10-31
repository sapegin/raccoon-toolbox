import type { ReactNode } from 'react';
import { ErrorMessage } from './ErrorMessage';
import { Flex } from './Flex';
import { Stack } from './Stack';
import { Text } from './Text';
import { Box } from './Box';

export function Panel({
  label,
  actions,
  errorMessage,
  children,
}: {
  label: ReactNode;
  /** Actions shown on the right side of the label (such as Copy button). */
  actions?: ReactNode;
  /** Show an error message overlay instead of the panel content. */
  errorMessage?: string;
  children: ReactNode;
}) {
  return (
    <Stack gap="xs" minHeight={0} height="100%">
      <Flex justifyContent="space-between" alignItems="center">
        <Text as="h3">{label}</Text>
        {actions && (
          <Stack direction="row" gap="s">
            {actions}
          </Stack>
        )}
      </Flex>
      <Box position="relative" height="100%" minHeight={0}>
        {errorMessage && (
          <ErrorMessage position="absolute" inset={0} zIndex={99} p="m">
            {errorMessage}
          </ErrorMessage>
        )}
        {children}
      </Box>
    </Stack>
  );
}
