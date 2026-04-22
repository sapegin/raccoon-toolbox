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
          `
            block rounded-button px-2 py-1 no-underline focus-outline
            transition-all duration-(--duration-hover) ease-hover
            focus-visible:outline-2
          `,
          isActive
            ? `
              bg-(image:--gradient-accent) text-button-foreground
              text-shadow-button-pressed
              hover:text-button-foreground
            `
            : `
              text-text-foreground
              hover:bg-hover-background hover:text-active-foreground
            `
        )
      }
    >
      {children}
    </NavLink>
  );
}
