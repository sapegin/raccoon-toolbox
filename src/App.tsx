import { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as app from '@tauri-apps/api';
import { isTauri } from '@tauri-apps/api/core';
import { Flex, VisuallyHidden } from '../styled-system/jsx';
import { usePersistentState } from './hooks/usePersistentState';
import { useHotkey } from './hooks/useHotkey';
import { Box } from './components/Box';
import { Grid } from './components/Grid';
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
    if (isTauri() && currentTool) {
      void window.__TAURI__.window
        .getCurrentWindow()
        .setTitle(currentTool.name);
    }
  }, [currentTool]);

  // Listen to the toggle sidebar menu item events
  useEffect(() => {
    if (isTauri()) {
      void window.__TAURI__.event.listen('toggle-sidebar', () => {
        setIsSidebarOpen((prev) => prev === false);
      });
    }
  }, [setIsSidebarOpen]);

  // Handle keyboard shortcut for toggling sidebar
  useHotkey(() => setIsSidebarOpen((prev) => prev === false), {
    enabled: isTauri() === false,
    key: '/',
    metaKey: true,
    ctrlKey: false,
  });

  return (
    <>
      <VisuallyHidden as="h1">Raccoon Toolbox</VisuallyHidden>
      <Grid
        gridTemplateColumns={isSidebarOpen ? '16rem auto' : 'auto'}
        gridTemplateRows={isSidebarOpen ? 'auto' : '2.3rem auto'}
        gap="m"
        height="100vh"
      >
        {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
        {isSidebarOpen === false && isTauri() === false ? (
          <Header
            title={currentToolName}
            onOpen={() => setIsSidebarOpen(true)}
          />
        ) : (
          <VisuallyHidden as="h2">{currentToolName}</VisuallyHidden>
        )}
        <Box minHeight={0} height="100%">
          <Suspense
            fallback={
              <Flex height="100%" alignItems="center" justifyContent="center">
                <Spinner />
              </Flex>
            }
          >
            <Router />
          </Suspense>
        </Box>
      </Grid>
    </>
  );
}
