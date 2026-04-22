import clsx from 'clsx';
import { type ReactNode } from 'react';
import { APP_NAME } from '../constants';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  title: string;
  children: ReactNode;
  isSidebarOpen: boolean;
  isHeaderVisible: boolean;
  onSidebarClose?: () => void;
  onHeaderOpen?: () => void;
  onSearchOpen?: () => void;
  onHotkeysOpen?: () => void;
}

export function AppLayout({
  title,
  children,
  isSidebarOpen,
  isHeaderVisible,
  onSidebarClose,
  onHeaderOpen,
  onSearchOpen,
  onHotkeysOpen,
}: AppLayoutProps) {
  return (
    <>
      <h1 className="sr-only">{APP_NAME}</h1>
      <div
        className={clsx(
          'grid h-screen w-screen grid-cols-[auto_1fr]',
          isSidebarOpen && 'gap-2'
        )}
        suppressHydrationWarning
      >
        <Sidebar
          show={isSidebarOpen}
          onClose={onSidebarClose}
          onSearchOpen={onSearchOpen}
          onHotkeysOpen={onHotkeysOpen}
        />
        <div className="grid h-screen" style={{ gridTemplateRows: 'auto 1fr' }}>
          <Header title={title} show={isHeaderVisible} onOpen={onHeaderOpen} />
          <div className="h-full min-h-0">{children}</div>
        </div>
      </div>
    </>
  );
}
