import clsx from 'clsx';
import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

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
      className={({ isActive }) =>
        clsx(
          `rounded-button focus-outline ease-hover block px-2 py-1 no-underline transition-all duration-(--duration-hover) focus-visible:outline-2`,
          isActive
            ? `text-button-foreground text-shadow-button-pressed bg-gradient-accent`
            : `text-text-foreground hover:bg-hover-background hover:text-active-foreground`
        )
      }
    >
      {children}
    </NavLink>
  );
}
