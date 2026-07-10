import clsx from 'clsx';
import { type ComponentProps } from 'react';

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
        `rounded-button text-icon focus-outline ease-hover hover:bg-hover-background hover:text-active-icon inline-flex aspect-square cursor-pointer items-center justify-center border-0 bg-transparent p-1 outline-0 transition-all duration-(--duration-hover) focus-visible:outline-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-60`,
        className
      )}
    />
  );
}
