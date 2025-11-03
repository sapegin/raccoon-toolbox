import { type ReactNode } from 'react';
import { VisuallyHidden } from '../../styled-system/jsx';
import { Box } from './Box';
import { Grid } from './Grid';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { APP_NAME } from '../constants';

interface AppLayoutProps {
  title: string;
  children: ReactNode;
  isSidebarOpen: boolean;
  isHeaderVisible: boolean;
  onSidebarClose?: () => void;
  onHeaderOpen?: () => void;
  onSearchOpen?: () => void;
}

export function AppLayout({
  title,
  children,
  isSidebarOpen,
  isHeaderVisible,
  onSidebarClose,
  onHeaderOpen,
  onSearchOpen,
}: AppLayoutProps) {
  return (
    <>
      <VisuallyHidden as="h1">{APP_NAME}</VisuallyHidden>
      <Grid
        gridTemplateColumns="auto 1fr"
        gap={isSidebarOpen ? 's' : 0}
        width="100vw"
        height="100vh"
      >
        <Sidebar
          show={isSidebarOpen}
          onClose={onSidebarClose}
          onSearchOpen={onSearchOpen}
        />
        <Grid gridTemplateRows="auto 1fr" height="100vh">
          <Header title={title} show={isHeaderVisible} onOpen={onHeaderOpen} />
          <Box minHeight={0} height="100%">
            {children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
