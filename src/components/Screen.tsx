import clsx from 'clsx';
import type { ComponentProps } from 'react';

export function Screen({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={clsx('screen', className)} />;
}
