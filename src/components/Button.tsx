import { styled } from '../../styled-system/jsx';

export const Button = styled('button', {
  base: {
    display: 'inline-block',
    borderWidth: 0,
    borderRadius: 'button',
    lineHeight: '1rem',
    textDecoration: 'none',
    userSelect: 'none',
    outline: 0,
    transitionDuration: 'hover',
    transitionTimingFunction: 'hover',
    transitionProperty: 'all',
    _hover: {
      cursor: 'pointer',
    },
    _active: {
      transform: 'translateY(1px)',
    },
    _disabled: {
      opacity: 0.6,
      pointerEvents: 'none',
    },
    _focusVisible: {
      outline: 'focus',
      outlineOffset: 'token(borderWidths.focusOutlineOffset)',
    },
    '&::-moz-focus-inner': {
      border: 0,
    },
  },
  variants: {
    variant: {
      primary: {
        color: 'buttonForeground',
        backgroundColor: 'buttonBackground',
        _hover: {
          backgroundColor: 'buttonHoverBackground',
        },
      },
      secondary: {
        color: 'secondaryButtonForeground',
        backgroundColor: 'secondaryButtonBackground',
        _hover: {
          backgroundColor: 'secondaryButtonHoverBackground',
        },
      },
    },
    size: {
      small: {
        height: '1.4rem',
        px: 's',
        fontSize: 'medium',
      },
    },
  },
  defaultVariants: {
    variant: 'secondary',
    size: 'small',
  },
});
