import type { ReactNode } from 'react';
import {
  Flex,
  Stack,
  styled,
  type HTMLStyledProps,
} from '../../styled-system/jsx';
import { text, Text } from './Text';

export const InputBox = styled('input', {
  base: {
    width: '100%',
    padding: 's',
    fontSize: 'm',
    fontFamily: 'code',
    color: 'textForeground',
    backgroundColor: 'textBackground',
    border: 'input',
    borderRadius: 'input',
    boxShadow: 'input',
    outline: 0,
    // Hide up/down arrows in Firefox
    appearance: 'textfield',
    _placeholder: {
      color: 'secondaryTextForeground',
    },
    _focusVisible: {
      border: 'inputFocus',
    },
    _disabled: {
      opacity: 0.6,
    },
    // Style up/down arrows in other browsers
    '&::-webkit-inner-spin-button': {
      cursor: 'pointer',
    },
  },
});

export function Input({
  id,
  label,
  actions,
  errorMessage,
  ...props
}: HTMLStyledProps<'input'> & {
  id: string;
  label: ReactNode;
  /** Actions shown on the right side of the label (such as Copy button). */
  actions?: ReactNode;
  /** Show an error message under the input field. */
  errorMessage?: string;
}) {
  return (
    <Stack gap="xs">
      <Flex justifyContent="space-between" alignItems="center">
        <label htmlFor={id} className={text()}>
          {label}
        </label>
        <Stack direction="row" gap="s">
          {actions}
        </Stack>
      </Flex>
      <Stack gap="s">
        <InputBox id={id} {...props} />
        {errorMessage && <Text variant="error">{errorMessage}</Text>}
      </Stack>
    </Stack>
  );
}
