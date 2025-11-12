import './styles.css';
import { invoke, isTauri } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { openUrl } from '@tauri-apps/plugin-opener';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { CommandPalette } from './components/CommandPalette';
import { HotkeysDialog } from './components/HotkeysDialog';
import { Router } from './components/Router';
import { Screen } from './components/Screen';
import { Spinner } from './components/Spinner';
import { APP_NAME } from './constants';
import { useHotkey } from './hooks/useHotkey';
import { usePersistentState } from './hooks/usePersistentState';
import { tools } from './tools';

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = usePersistentState(
    'app.sidebarOpen',
    true
  );
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isHotkeysDialogOpen, setIsHotkeysDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentToolId = location.pathname.replaceAll(/[^-\w]/g, '');
  const currentTool = tools.find((tool) => tool.id === currentToolId);
  const currentToolName = currentTool?.name ?? 'Loading…';

  const isHeaderVisible = isSidebarOpen === false && isTauri() === false;

  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => prev === false),
    [setIsSidebarOpen]
  );

  const toggleCommandPalette = useCallback(
    () => setIsCommandPaletteOpen((prev) => prev === false),
    [setIsCommandPaletteOpen]
  );

  const toggleHotkeysDialog = useCallback(
    () => setIsHotkeysDialogOpen((prev) => prev === false),
    [setIsHotkeysDialogOpen]
  );

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
      const unlisten = listen('toggle-command-palette', toggleCommandPalette);
      return () => {
        void unlisten.then((fn) => fn());
      };
    }
  }, []);

  // Listen to the toggle hotkeys dialog menu item events
  useEffect(() => {
    if (isTauri()) {
      const unlisten = listen('toggle-hotkeys-dialog', toggleHotkeysDialog);
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
  useHotkey(toggleCommandPalette, {
    key: 'k',
    metaKey: true,
    ctrlKey: false,
  });

  // Handle keyboard shortcut for toggling hotkeys dialog
  useHotkey(toggleHotkeysDialog, {
    key: 'F1',
  });

  return (
    <>
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
      <HotkeysDialog
        isOpen={isHotkeysDialogOpen}
        onClose={() => setIsHotkeysDialogOpen(false)}
      />
      <AppLayout
        title={currentToolName}
        isSidebarOpen={isSidebarOpen}
        isHeaderVisible={isHeaderVisible}
        onSidebarClose={toggleSidebar}
        onHeaderOpen={toggleSidebar}
        onSearchOpen={() => setIsCommandPaletteOpen(true)}
        onHotkeysOpen={() => setIsHotkeysDialogOpen(true)}
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
