import type { ReactNode } from 'react';
import { css } from '../../styled-system/css';

export function Table({ children }: { children: ReactNode }) {
  return (
    <table
      className={css({
        width: '100%',
        borderCollapse: 'collapse',
        '& th': {
          textAlign: 'left',
          paddingBlock: 's',
          paddingInline: 'm',
          borderBottom: '1px solid',
          borderColor: 'lightBorder',
          color: 'textForeground',
          fontSize: 's',
          fontWeight: 'normal',
        },
        '& th:first-child': {
          paddingLeft: 0,
        },
        '& th:last-child': {
          paddingRight: 0,
        },
        '& td': {
          paddingBlock: 's',
          paddingInline: 'm',
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
