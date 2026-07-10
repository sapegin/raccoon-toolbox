import './styles.css';
import { invoke, isTauri } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
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
import {
  getEditorSettings,
  setEditorSettings,
  useEditorSettings,
} from './hooks/useEditorSettings';
import { useHotkey } from './hooks/useHotkey';
import { usePersistentState } from './hooks/usePersistentState';
import { tools } from './tools';
import { getToolIdFromPath } from './util/getToolIdFromPath';

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = usePersistentState(
    'app.sidebarOpen',
    true
  );
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isHotkeysDialogOpen, setIsHotkeysDialogOpen] = useState(false);
  const { showWhitespace } = useEditorSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const currentToolId = getToolIdFromPath(location.pathname);
  const currentTool = tools.find((tool) => tool.id === currentToolId);
  const currentToolName = currentTool?.name ?? 'Loading…';

  const isHeaderVisible = isTauri() || isSidebarOpen === false;

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

  // Set the page title (tool name is shown in the in-app header on desktop)
  useEffect(() => {
    document.title =
      isTauri() || currentTool === undefined
        ? APP_NAME
        : `${currentTool.name} — ${APP_NAME}`;
  }, [currentTool]);

  // Listen to the toggle sidebar menu item events
  useEffect(() => {
    if (isTauri()) {
      const unlisten = listen('toggle-sidebar', toggleSidebar);
      return () => {
        void (async () => {
          (await unlisten)();
        })();
      };
    }
  }, [toggleSidebar]);

  // Listen to the toggle command palette menu item events
  useEffect(() => {
    if (isTauri()) {
      const unlisten = listen('toggle-command-palette', toggleCommandPalette);
      return () => {
        void (async () => {
          (await unlisten)();
        })();
      };
    }
  }, [toggleCommandPalette]);

  // Listen to the toggle hotkeys dialog menu item events
  useEffect(() => {
    if (isTauri()) {
      const unlisten = listen('toggle-hotkeys-dialog', toggleHotkeysDialog);
      return () => {
        void (async () => {
          (await unlisten)();
        })();
      };
    }
  }, [toggleHotkeysDialog]);

  // Listen to the toggle show whitespace menu item events
  useEffect(() => {
    if (isTauri()) {
      const unlisten = listen('toggle-show-whitespace', () => {
        setEditorSettings({
          showWhitespace: getEditorSettings().showWhitespace === false,
        });
      });
      return () => {
        void (async () => {
          (await unlisten)();
        })();
      };
    }
  }, []);

  // Sync the show whitespace menu item state with the persisted setting
  useEffect(() => {
    if (isTauri()) {
      void invoke('set_show_whitespace', { checked: showWhitespace });
    }
  }, [showWhitespace]);

  // Listen to the select tool menu item events
  useEffect(() => {
    if (isTauri()) {
      const unlisten = listen<string>('select-tool', (event) => {
        void navigate(`/${event.payload}/`);
      });
      return () => {
        void (async () => {
          (await unlisten)();
        })();
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
        void (async () => {
          (await unlisten)();
        })();
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
            <Screen className="place-items-center justify-center">
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
