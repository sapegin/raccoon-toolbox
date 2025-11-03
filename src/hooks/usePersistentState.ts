import { useState, useEffect } from 'react';

export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync from localStorage after mount
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        setState(JSON.parse(item) as T);
      }
    } catch {
      // Ignore errors
    }
    setIsInitialized(true);
  }, [key]);

  // Persist to localStorage on changes (but not initial mount)
  useEffect(() => {
    if (isInitialized === false) {
      return;
    }

    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch {
        // Silently fail if localStorage is unavailable
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [key, state, isInitialized]);

  return [state, setState];
}
