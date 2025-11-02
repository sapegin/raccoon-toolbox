import { Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { listen } from '@tauri-apps/api/event';
import { invoke, isTauri } from '@tauri-apps/api/core';
import { openUrl } from '@tauri-apps/plugin-opener';
import { usePersistentState } from './hooks/usePersistentState';
import { useHotkey } from './hooks/useHotkey';
import { Router } from './components/Router';
import { Spinner } from './components/Spinner';
import { CommandPalette } from './components/CommandPalette';
import { AppLayout } from './components/AppLayout';
import { tools } from './tools';
import './styles.css';
import { APP_NAME } from './constants';
import { Screen } from './components/Screen';

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = usePersistentState(
    'app.sidebarOpen',
    true
  );
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentToolId = location.pathname.replaceAll(/[^-a-z]/g, '');
  const currentTool = tools.find((tool) => tool.id === currentToolId);
  const currentToolName = currentTool?.name ?? 'Loading…';

  console.log('🍔 isSidebarOpen', isSidebarOpen);

  const isHeaderVisible = isSidebarOpen === false && isTauri() === false;

  const toggleSidebar = () => setIsSidebarOpen((prev) => prev === false);

  // Set the selected tool name to the window title
  useEffect(() => {
    if (isTauri()) {
      if (currentTool) {
        void getCurrentWindow().setTitle(currentTool.name);
      }
    } else {
      document.title = currentTool
        ? `${currentTool.name} — ${APP_NAME}`
        : APP_NAME;
    }
  }, [currentTool]);

  // Listen to the toggle sidebar menu item events
  useEffect(() => {
    if (isTauri()) {
      const unlisten = listen('toggle-sidebar', toggleSidebar);
      return () => {
        void unlisten.then((fn) => fn());
      };
    }
  }, []);

  // Listen to the toggle command palette menu item events
  useEffect(() => {
    if (isTauri()) {
      const unlisten = listen('toggle-command-palette', () => {
        setIsCommandPaletteOpen((prev) => prev === false);
      });
      return () => {
        void unlisten.then((fn) => fn());
      };
    }
  }, []);

  // Listen to the select tool menu item events
  useEffect(() => {
    if (isTauri()) {
      const unlisten = listen<string>('select-tool', (event) => {
        void navigate(`/${event.payload}/`);
      });
      return () => {
        void unlisten.then((fn) => fn());
      };
    }
  }, [navigate]);

  // Listen to the open URL menu item events
  useEffect(() => {
    if (isTauri()) {
      const unlisten = listen<string>('open-url', (event) => {
        void openUrl(event.payload);
      });
      return () => {
        void unlisten.then((fn) => fn());
      };
    }
  }, []);

  // Update selected tool in the app menu
  useEffect(() => {
    if (isTauri() && currentToolId) {
      void invoke('set_selected_tool', { toolId: currentToolId });
    }
  }, [currentToolId]);

  // Handle keyboard shortcut for toggling sidebar
  useHotkey(toggleSidebar, {
    enabled: isTauri() === false,
    key: '/',
    metaKey: true,
    ctrlKey: false,
  });

  // Handle keyboard shortcut for toggling command palette
  useHotkey(() => setIsCommandPaletteOpen((prev) => prev === false), {
    key: 'k',
    metaKey: true,
    ctrlKey: false,
  });

  return (
    <>
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
      <AppLayout
        title={currentToolName}
        isSidebarOpen={isSidebarOpen}
        isHeaderVisible={isHeaderVisible}
        onSidebarClose={toggleSidebar}
        onHeaderOpen={toggleSidebar}
      >
        <Suspense
          fallback={
            <Screen alignItems="center" justifyContent="center">
              <Spinner />
            </Screen>
          }
        >
          <Router />
        </Suspense>
      </AppLayout>
    </>
  );
}
