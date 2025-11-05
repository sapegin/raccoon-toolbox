import { styled } from '../../styled-system/jsx';

export const SearchButton = styled('button', {
  base: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: 's',
    p: 's',
    fontSize: 's',
    color: 'secondaryTextForeground',
    backgroundColor: 'textBackground',
    border: 'input',
    borderRadius: 'search',
    boxShadow: 'input',
    cursor: 'pointer',
    outline: 0,
    transitionDuration: 'hover',
    transitionTimingFunction: 'hover',
    transitionProperty: 'all',
    _hover: {
      color: 'activeForeground',
      borderColor: 'activeBorder',
    },
    _active: {
      transform: 'translateY(1px)',
    },
    _focusVisible: {
      outline: 'focus',
      outlineOffset: 'token(borderWidths.focusOutlineOffset)',
    },
  },
});
