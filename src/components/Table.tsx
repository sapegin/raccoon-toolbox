import clsx from 'clsx';
import type { ReactNode } from 'react';

export function Table({
  variant = 'spacious',
  children,
}: {
  variant?: 'spacious' | 'dense';
  children: ReactNode;
}) {
  return (
    <table
      className={clsx(
        'table w-full',
        variant === 'spacious' ? 'table-spacious' : 'table-dense'
      )}
    >
      {children}
    </table>
  );
}
