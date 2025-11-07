import { type ReactNode } from 'react';
import { css } from '../../styled-system/css';

const linkStyles = css({
  display: 'inline-block',
  px: 's',
  py: 'xs',
  borderRadius: 'button',
  color: 'textForeground',
  textDecoration: 'none',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  fontFamily: 'body',
  fontSize: 's',
  _hover: {
    color: 'activeForeground',
    backgroundColor: 'hoverBackground',
  },
  _focusVisible: {
    outline: 'focus',
    outlineOffset: 'token(borderWidths.focusOutlineOffset)',
  },
});

export function SidebarLink({
  href,
  onClick,
  children,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (href) {
    return (
      <a
        className={linkStyles}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button className={linkStyles} onClick={onClick} type="button">
      {children}
    </button>
  );
}
