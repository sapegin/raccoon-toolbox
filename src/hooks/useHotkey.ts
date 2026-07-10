import { useEffect } from 'react';

/** Register a global hotkey. */
export function useHotkey(
  callback: () => Promise<void> | void,
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

    // oxlint-disable-next-line promise/prefer-await-to-callbacks
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
        void (async () => {
          // oxlint-disable-next-line promise/prefer-await-to-callbacks
          await callback();
        })();
      }
    };

    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [callback, config]);
}
