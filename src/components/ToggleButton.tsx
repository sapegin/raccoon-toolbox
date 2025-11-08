import { Fragment, type ReactNode } from 'react';
import { styled } from '../../styled-system/jsx';

const ToggleButtonContainer = styled('div', {
  base: {
    height: '1.5rem',
    display: 'inline-flex',
    border: 'button',
    borderRadius: 'button',
    boxShadow: 'button',
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
    height: '100%',
    px: 's',
    fontSize: 'medium',
    userSelect: 'none',
    borderWidth: 0,
    outline: 0,
    transitionDuration: 'hover',
    transitionTimingFunction: 'hover',
    transitionProperty: 'all',
    cursor: 'pointer',
    'input:focus-visible + &': {
      outline: 'focus',
      outlineOffset: 'token(borderWidths.focusOutlineOffset)',
      zIndex: 10,
    },
    // Inner border radius must be a bit smaller than the outer
    '&:first-of-type': {
      borderStartRadius: '5px',
    },
    '&:last-of-type': {
      borderEndRadius: '5px',
    },
  },
  variants: {
    checked: {
      true: {
        color: 'buttonPressedForeground',
        bgGradient: 'buttonPressed',
        textShadow: 'buttonPressedText',
        boxShadow: 'buttonPressed',
      },
      false: {
        color: 'secondaryButtonForeground',
        bgGradient: 'button',
        textShadow: 'buttonText',
        _hover: {
          backgroundColor: 'secondaryButtonBackground',
          bgGradient: 'buttonHover',
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
