import clsx from 'clsx';
import { type ComponentProps } from 'react';

export function ErrorMessage({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        `bg-text-background text-error-foreground font-mono whitespace-pre-wrap`,
        className
      )}
    >
      {children}
    </div>
  );
}
