import { useEffect } from 'react';

/** Register a global hotkey. */
export function useHotkey(
  callback: () => void,
  config: {
    enabled?: boolean;
    key: string;
    metaKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
  }
) {
  useEffect(() => {
    if (config.enabled === false) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const metaKeyMatch =
        config.metaKey === undefined || event.metaKey === config.metaKey;
      const ctrlKeyMatch =
        config.ctrlKey === undefined || event.ctrlKey === config.ctrlKey;
      const shiftKeyMatch =
        config.shiftKey === undefined || event.shiftKey === config.shiftKey;
      const altKeyMatch =
        config.altKey === undefined || event.altKey === config.altKey;

      if (
        event.key === config.key &&
        metaKeyMatch &&
        ctrlKeyMatch &&
        shiftKeyMatch &&
        altKeyMatch
      ) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback, config]);
}
