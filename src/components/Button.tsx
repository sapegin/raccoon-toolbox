import clsx from 'clsx';
import type { ComponentProps } from 'react';

const sizeClasses = {
  small: 'button-small',
  large: 'button-large',
} as const;

type ButtonProps = ComponentProps<'button'> & {
  size?: keyof typeof sizeClasses;
};

export function Button({ size = 'small', className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx('button', sizeClasses[size], className)}
    />
  );
}
