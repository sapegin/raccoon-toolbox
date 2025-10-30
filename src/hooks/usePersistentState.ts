import { useState, useEffect } from 'react';

export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    // Debounce writing to localStorage
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch {
        // Silently fail if localStorage is unavailable
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [key, state]);

  return [state, setState];
}
