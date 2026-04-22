import clsx from 'clsx';
import type { ComponentProps } from 'react';

export function IconButton({
  label,
  className,
  ...props
}: { label: string } & ComponentProps<'button'>) {
  return (
    <button
      {...props}
      title={label}
      aria-label={label}
      className={clsx(
        `
          inline-flex aspect-square cursor-pointer items-center justify-center
          rounded-button border-0 bg-transparent p-1 text-icon focus-outline
          outline-0 transition-all duration-(--duration-hover) ease-hover
          hover:bg-hover-background hover:text-active-icon
          focus-visible:outline-2
          active:translate-y-px
          disabled:pointer-events-none disabled:opacity-60
        `,
        className
      )}
    />
  );
}
