import { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as app from '@tauri-apps/api';
import { Flex, VisuallyHidden } from '../styled-system/jsx';
import { usePersistentState } from './hooks/usePersistentState';
import { Grid } from './components/Grid';
import { Stack } from './components/Stack';
import { Router } from './components/Router';
import { Spinner } from './components/Spinner';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { tools } from './tools';
import './styles.css';

declare global {
  interface Window {
    __TAURI__: typeof app;
  }
}

export const isTauri = '__TAURI__' in window;

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = usePersistentState(
    'app.sidebarOpen',
    true
  );
  const location = useLocation();
  const currentToolId = location.pathname.slice(1);
  const currentTool = tools.find((tool) => tool.id === currentToolId);
  const currentToolName = currentTool?.name ?? 'Loading…';

  // Set the selected tool name to the app title
  useEffect(() => {
    if (isTauri && currentTool) {
      void window.__TAURI__.window
        .getCurrentWindow()
        .setTitle(currentTool.name);
    }
  }, [currentTool]);

  // Listen to the toggle sidebar menu item events
  useEffect(() => {
    if (isTauri) {
      void window.__TAURI__.event.listen('toggle-sidebar', () => {
        setIsSidebarOpen((prev) => prev === false);
      });
    }
  }, [setIsSidebarOpen]);

  return (
    <>
      <VisuallyHidden as="h1">Raccoon Toolbox</VisuallyHidden>
      <Grid
        gridTemplateColumns={isSidebarOpen ? '16rem auto' : 'auto'}
        gap="m"
        height="100vh"
      >
        {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
        <Stack gap="m">
          {isSidebarOpen === false && isTauri === false ? (
            <Header
              title={currentToolName}
              onOpen={() => setIsSidebarOpen(true)}
            />
          ) : (
            <VisuallyHidden as="h2">{currentToolName}</VisuallyHidden>
          )}
          <Suspense
            fallback={
              <Flex height="100%" alignItems="center" justifyContent="center">
                <Spinner />
              </Flex>
            }
          >
            <Router />
          </Suspense>
        </Stack>
      </Grid>
    </>
  );
}
