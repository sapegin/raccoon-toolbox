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
}

export function AppLayout({
  title,
  children,
  isSidebarOpen,
  isHeaderVisible,
  onSidebarClose,
  onHeaderOpen,
}: AppLayoutProps) {
  return (
    <>
      <VisuallyHidden as="h1">{APP_NAME}</VisuallyHidden>
      <Grid
        gridTemplateColumns={isSidebarOpen ? '16rem auto' : 'auto'}
        gridTemplateRows={isHeaderVisible ? '2.3rem auto' : 'auto'}
        gap="s"
        height="100vh"
      >
        {isSidebarOpen && <Sidebar onClose={onSidebarClose} />}
        {isHeaderVisible ? (
          <Header title={title} onOpen={onHeaderOpen} />
        ) : (
          <VisuallyHidden as="h2">{title}</VisuallyHidden>
        )}
        <Box minHeight={0} height="100%">
          {children}
        </Box>
      </Grid>
    </>
  );
}
