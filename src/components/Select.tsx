import type { ReactNode } from 'react';
import {
  Flex,
  Stack,
  styled,
  type HTMLStyledProps,
} from '../../styled-system/jsx';
import { text } from './Text';
import { visuallyHidden } from '../../styled-system/patterns/visually-hidden';

const SelectBox = styled('select', {
  base: {
    height: '1.4rem',
    px: 's',
    fontSize: 'medium',
    fontFamily: 'body',
    color: 'textForeground',
    backgroundColor: 'textBackground',
    border: 'input',
    borderRadius: 'button',
    cursor: 'pointer',
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
}: HTMLStyledProps<'select'> & {
  id: string;
  label?: ReactNode;
  accessibleLabel?: ReactNode;
  options: { value: string; label: string }[];
  actions?: ReactNode;
}) {
  return (
    <Stack gap="xs">
      {label && (
        <Flex justifyContent="space-between" alignItems="center">
          <label htmlFor={id} className={text()}>
            {label}
          </label>
          {actions && (
            <Stack direction="row" gap="s">
              {actions}
            </Stack>
          )}
        </Flex>
      )}
      {accessibleLabel && (
        <label htmlFor={id} className={visuallyHidden()}>
          {accessibleLabel}
        </label>
      )}
      <SelectBox id={id} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectBox>
    </Stack>
  );
}
