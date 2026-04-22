import clsx from 'clsx';
import type { ComponentProps } from 'react';

const variantClasses = {
  primary: 'button-primary',
  secondary: 'button-secondary',
} as const;

const sizeClasses = {
  small: 'h-6 px-2 text-sm',
} as const;

type ButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
};

export function Button({
  variant = 'secondary',
  size = 'small',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'button focus-outline',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    />
  );
}
