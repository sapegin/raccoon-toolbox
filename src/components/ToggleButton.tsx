import { Fragment, type ReactNode } from 'react';
import { styled } from '../../styled-system/jsx';

// TODO: More visible focus indicator

const ToggleButtonContainer = styled('div', {
  base: {
    display: 'inline-flex',
    overflow: 'hidden',
    border: '1px solid',
    borderColor: 'lightBorder',
    borderRadius: 'button',
  },
});

const ToggleButtonInput = styled('input', {
  base: {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
  },
});

const ToggleButtonLabel = styled('label', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(1.4rem - 2px)',
    px: 's',
    fontSize: 'medium',
    color: 'textForeground',
    backgroundColor: 'textBackground',
    borderWidth: 0,
    userSelect: 'none',
    outline: 0,
    transitionDuration: 'hover',
    transitionTimingFunction: 'hover',
    transitionProperty: 'all',
    cursor: 'pointer',
    _hover: {
      backgroundColor: 'secondaryButtonHoverBackground',
    },
    'input:focus-visible + &': {
      outline: 'focus',
      outlineOffset: -2,
      zIndex: 10,
    },
  },
  variants: {
    checked: {
      true: {
        color: 'secondaryButtonForeground',
        backgroundColor: 'secondaryButtonBackground',
        _hover: {
          backgroundColor: 'secondaryButtonBackground',
        },
      },
    },
  },
});

interface ToggleButtonOption {
  value: string;
  label: ReactNode;
}

interface ToggleButtonProps {
  name: string;
  value: string;
  options: ToggleButtonOption[];
  onChange: (value: string) => void;
}

export function ToggleButton({
  name,
  value,
  options,
  onChange,
}: ToggleButtonProps) {
  return (
    <ToggleButtonContainer role="group" aria-label={name}>
      {options.map((option) => {
        const id = `${name}-${option.value}`;
        const isChecked = value === option.value;
        return (
          <Fragment key={option.value}>
            <ToggleButtonInput
              type="radio"
              id={id}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={(e) => onChange(e.target.value)}
            />
            <ToggleButtonLabel htmlFor={id} checked={isChecked}>
              {option.label}
            </ToggleButtonLabel>
          </Fragment>
        );
      })}
    </ToggleButtonContainer>
  );
}
