import type { ReactNode } from 'react';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';

/**
 * Shows a value in large type with a label as <dt>/<dd>. Must be rendered
 * inside <dl>.
 */
export function LargeValue({
  label,
  value,
}: {
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <Stack gap="xs">
      <Text as="dt">{label}</Text>
      <Text as="dd" variant="large">
        {value}
      </Text>
    </Stack>
  );
}
