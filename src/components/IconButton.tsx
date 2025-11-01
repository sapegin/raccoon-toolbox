import { styled } from '../../styled-system/jsx';

export const IconButton = styled('button', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 'button',
    padding: 'xs',
    backgroundColor: 'transparent',
    color: 'icon',
    cursor: 'pointer',
    outline: 0,
    transitionDuration: 'hover',
    transitionTimingFunction: 'hover',
    transitionProperty: 'all',
    _hover: {
      color: 'activeIcon',
      backgroundColor: 'hoverBackground',
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
    },
  },
});
