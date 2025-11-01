import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { css } from '../../styled-system/css';

export function NavigationButton({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={css({
        display: 'block',
        px: 's',
        py: 'xs',
        borderRadius: 'button',
        color: 'textForeground',
        textDecoration: 'none',
        _hover: {
          color: 'activeForeground',
          backgroundColor: 'hoverBackground',
        },
        _focusVisible: {
          outline: 'focus',
          outlineOffset: 'token(borderWidths.focusOutlineOffset)',
        },
        '&.active': {
          color: 'buttonForeground',
          backgroundColor: 'accentBackground',
          _hover: {
            color: 'buttonForeground',
            backgroundColor: 'accentBackground',
          },
        },
      })}
    >
      {children}
    </NavLink>
  );
}
