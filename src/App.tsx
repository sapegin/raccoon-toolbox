import { Suspense, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { listen } from '@tauri-apps/api/event';
import { invoke, isTauri } from '@tauri-apps/api/core';
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

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = usePersistentState(
    'app.sidebarOpen',
    true
  );
  const location = useLocation();
  const navigate = useNavigate();
  const currentToolId = location.pathname.slice(1);
  const currentTool = tools.find((tool) => tool.id === currentToolId);
  const currentToolName = currentTool?.name ?? 'Loading…';

  const isHeaderVisible = isSidebarOpen === false && isTauri() === false;

  // Set the selected tool name to the app title
  useEffect(() => {
    if (isTauri() && currentTool) {
      void getCurrentWindow().setTitle(currentTool.name);
    }
  }, [currentTool]);

  // Listen to the toggle sidebar menu item events
  useEffect(() => {
    if (isTauri()) {
      const unlisten = listen('toggle-sidebar', () => {
        setIsSidebarOpen((prev) => prev === false);
      });
      return () => {
        void unlisten.then((fn) => fn());
      };
    }
  }, [setIsSidebarOpen]);

  // Listen to the select tool menu item events
  useEffect(() => {
    if (isTauri()) {
      const unlisten = listen<string>('select-tool', (event) => {
        void navigate(`/${event.payload}`);
      });
      return () => {
        void unlisten.then((fn) => fn());
      };
    }
  }, [navigate]);

  // Update selected tool in the app menu
  useEffect(() => {
    if (isTauri() && currentToolId) {
      void invoke('set_selected_tool', { toolId: currentToolId });
    }
  }, [currentToolId]);

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
        gridTemplateRows={isHeaderVisible ? '2.3rem auto' : 'auto'}
        gap="m"
        height="100vh"
      >
        {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
        {isHeaderVisible ? (
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
