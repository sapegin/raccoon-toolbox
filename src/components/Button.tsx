import { type ReactNode } from 'react';
import { cva, type RecipeVariantProps } from '../../styled-system/css';
import { Box, type BoxProps } from './Box';

const button = cva({
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
    _focusVisible: {
      outline: 'focus',
      outlineOffset: 'token(borderWidths.focusOutlineOffset)',
      borderRadius: '0.2rem',
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
});

export type ButtonProps = BoxProps &
  RecipeVariantProps<typeof button> & {
    children: ReactNode;
  };

export function Button({
  variant = 'secondary',
  size = 'small',
  children,
  ...props
}: ButtonProps) {
  return (
    <Box as="button" {...props} className={button({ variant, size })}>
      {children}
    </Box>
  );
}
