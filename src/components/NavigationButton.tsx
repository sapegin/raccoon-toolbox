import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';
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
        '&.active': {
          color: 'buttonForeground',
          backgroundColor: 'activeBackground',
        },
      })}
    >
      {children}
    </NavLink>
  );
}
