import type { ReactNode } from 'react';
import {
  Box,
  Flex,
  type HTMLStyledProps,
  Stack,
  styled,
} from '../../styled-system/jsx';
import { visuallyHidden } from '../../styled-system/patterns/visually-hidden';
import type { RequiredLabel } from '../types';
import { Icon } from './Icon';
import { text } from './Text';

const SelectBox = styled('select', {
  base: {
    display: 'inline-block',
    height: '1.5rem',
    m: 0,
    pl: 's',
    pr: 'm',
    fontSize: 'medium',
    fontFamily: 'body',
    color: 'textForeground',
    backgroundColor: 'textBackground',
    border: 0,
    borderRadius: 'button',
    cursor: 'pointer',
    appearance: 'none',
    _focusVisible: {
      outline: 'focus',
      outlineOffset: 'token(borderWidths.focusOutlineOffset)',
    },
    _disabled: {
      opacity: 0.6,
      cursor: 'default',
    },
  },
});

export function Select({
  id,
  label,
  accessibleLabel,
  options,
  actions,
  ...props
}: HTMLStyledProps<'select'> &
  RequiredLabel & {
    id: string;
    options: { value: string; label: string }[];
    actions?: ReactNode;
  }) {
  return (
    <Stack display="inline-flex" gap="xs">
      {label ? (
        <Flex justifyContent="space-between" alignItems="center">
          <label htmlFor={id} className={text()}>
            {label}
          </label>
          {actions ? (
            <Stack direction="row" gap="s">
              {actions}
            </Stack>
          ) : null}
        </Flex>
      ) : null}
      {accessibleLabel ? (
        <label htmlFor={id} className={visuallyHidden()}>
          {accessibleLabel}
        </label>
      ) : null}
      <Flex position="relative" border="input" borderRadius="button">
        <SelectBox id={id} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectBox>
        <Box
          position="absolute"
          top={0}
          bottom={0}
          right="xxs"
          zIndex={10}
          display="flex"
          alignItems="center"
        >
          <Icon icon="select" size={14} />
        </Box>
      </Flex>
    </Stack>
  );
}
