import { useSyncExternalStore } from 'react';

export interface EditorSettings {
  showWhitespace: boolean;
}

const STORAGE_KEY = 'editor.settings';
const DEFAULT_SETTINGS: EditorSettings = { showWhitespace: true };

let currentSettings: EditorSettings = (() => {
  try {
    const item =
      typeof localStorage === 'undefined'
        ? null
        : localStorage.getItem(STORAGE_KEY);
    if (item !== null) {
      return {
        ...DEFAULT_SETTINGS,
        ...(JSON.parse(item) as Partial<EditorSettings>),
      };
    }
  } catch {
    // Ignore
  }
  return DEFAULT_SETTINGS;
})();

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getEditorSettings(): EditorSettings {
  return currentSettings;
}

export function setEditorSettings(patch: Partial<EditorSettings>) {
  const next = { ...currentSettings, ...patch };
  currentSettings = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSettings));
  } catch {
    // Ignore
  }
  for (const listener of listeners) {
    listener();
  }
}

export function useEditorSettings(): EditorSettings {
  return useSyncExternalStore(subscribe, getEditorSettings, getEditorSettings);
}
