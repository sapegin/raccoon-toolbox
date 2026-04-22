import clsx from 'clsx';
import { type ReactNode } from 'react';

const linkClasses = clsx(
  `
    inline-block cursor-pointer rounded-button border-none bg-none px-2 py-1
    text-left font-body text-sm text-text-foreground no-underline focus-outline
    transition-all duration-(--duration-hover) ease-hover
    hover:bg-hover-background hover:text-active-foreground
    focus-visible:outline-2
  `
);

export function SidebarLink({
  href,
  onClick,
  children,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (href) {
    return (
      <a
        className={linkClasses}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button className={linkClasses} onClick={onClick} type="button">
      {children}
    </button>
  );
}
