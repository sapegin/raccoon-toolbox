import type { ReactNode } from 'react';
import { css } from '../../styled-system/css';

export function Table({
  variant = 'spacious',
  children,
}: {
  variant?: 'spacious' | 'dense';
  children: ReactNode;
}) {
  return (
    <table
      className={css({
        width: '100%',
        borderCollapse: 'collapse',
        '& th': {
          textAlign: 'left',
          paddingBlock: variant === 'spacious' ? 's' : 'xs',
          paddingInline: variant === 'spacious' ? 'm' : 's',
          borderBottom: '1px solid',
          borderColor: 'lightBorder',
          color: 'textForeground',
          fontSize: 's',
          fontWeight: 'bold',
        },
        '& th:first-child': {
          paddingLeft: 0,
        },
        '& th:last-child': {
          paddingRight: 0,
        },
        '& td': {
          paddingBlock: variant === 'spacious' ? 's' : 'xs',
          paddingInline: variant === 'spacious' ? 'm' : 's',
          color: 'textForeground',
          borderBottom: '1px solid',
          borderColor: 'lightBorder',
        },
        '& td:first-child': {
          paddingLeft: 0,
        },
        '& td:last-child': {
          paddingRight: 0,
        },
        '& tbody tr:hover': {
          backgroundColor: 'lineHighlightBackground',
        },
      })}
    >
      {children}
    </table>
  );
}
