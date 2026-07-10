import { isTauri } from '@tauri-apps/api/core';
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
        className="grid h-screen w-screen grid-rows-[auto_1fr]"
        suppressHydrationWarning
      >
        <Header
          title={title}
          show={isHeaderVisible}
          showOpenButton={isTauri() === false}
          onOpen={onHeaderOpen}
        />
        <div
          className={clsx(
            'grid min-h-0 grid-cols-[auto_1fr]',
            isSidebarOpen && 'gap-2'
          )}
        >
          <Sidebar
            show={isSidebarOpen}
            onClose={onSidebarClose}
            onSearchOpen={onSearchOpen}
            onHotkeysOpen={onHotkeysOpen}
          />
          <div className="min-h-0">{children}</div>
        </div>
      </div>
    </>
  );
}
