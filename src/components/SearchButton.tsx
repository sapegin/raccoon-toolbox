import clsx from 'clsx';
import { type ComponentProps } from 'react';

export function SearchButton({
  className,
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        `rounded-search border-light-border bg-text-background text-secondary-text-foreground shadow-input focus-outline ease-hover hover:border-active-border hover:text-active-foreground flex w-full items-center gap-2 border p-2 text-sm leading-[1.2] outline-0 transition-all duration-(--duration-hover) focus-visible:outline-2 active:translate-y-px`,
        className
      )}
    />
  );
}
