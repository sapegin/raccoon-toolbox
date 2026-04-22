import clsx from 'clsx';
import type { ComponentProps } from 'react';

export function ErrorMessage({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        `bg-text-background font-mono whitespace-pre-wrap text-error-foreground`,
        className
      )}
    >
      {children}
    </div>
  );
}
