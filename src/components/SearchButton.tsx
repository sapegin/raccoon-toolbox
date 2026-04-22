import clsx from 'clsx';
import type { ComponentProps } from 'react';

export function SearchButton({
  className,
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={clsx(
        `
          flex w-full cursor-pointer items-center gap-2 rounded-search border
          border-light-border bg-text-background p-2 text-sm leading-[1.2]
          text-secondary-text-foreground shadow-input focus-outline outline-0
          transition-all duration-(--duration-hover) ease-hover
          hover:border-active-border hover:text-active-foreground
          focus-visible:outline-2
          active:translate-y-px
        `,
        className
      )}
    />
  );
}
