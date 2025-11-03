import type { ReactNode } from 'react';
import { ErrorMessage } from './ErrorMessage';
import { Flex } from './Flex';
import { Stack } from './Stack';
import { Text } from './Text';
import { Box } from './Box';
import { VisuallyHidden } from '../../styled-system/jsx';

export function Panel({
  label,
  accessibleLabel,
  actions,
  errorMessage,
  fullHeight,
  children,
}: {
  label?: ReactNode;
  accessibleLabel?: ReactNode;
  /** Actions shown on the right side of the label (such as Copy button). */
  actions?: ReactNode;
  /** Show an error message overlay instead of the panel content. */
  errorMessage?: string;
  fullHeight?: boolean;
  children: ReactNode;
}) {
  return (
    <Stack gap="xs" css={fullHeight ? { minHeight: 0, height: '100%' } : {}}>
      {accessibleLabel ? (
        <VisuallyHidden as="h3">{accessibleLabel}</VisuallyHidden>
      ) : (
        <Flex justifyContent="space-between" alignItems="center">
          <Text as="h3">{label}</Text>
          {actions && (
            <Stack direction="row" gap="s">
              {actions}
            </Stack>
          )}
        </Flex>
      )}
      <Box position="relative" height="100%" minHeight={0}>
        {errorMessage && (
          <ErrorMessage
            position="absolute"
            inset={0}
            zIndex={99}
            p="m"
            overflow="auto"
          >
            {errorMessage}
          </ErrorMessage>
        )}
        {children}
      </Box>
    </Stack>
  );
}
