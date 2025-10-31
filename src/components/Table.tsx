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
        '& td': {
          paddingBlock: 's',
          paddingInline: 'm',
          borderBottom: '1px solid',
          borderColor: 'lightBorder',
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
