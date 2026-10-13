import { useEffect, useState } from 'react';

function resolveInitialValue<T>(initialValue: T | (() => T)): T {
  if (typeof initialValue === 'function') {
    return (initialValue as () => T)();
  }
  return initialValue;
}

export function usePersistentState<T>(
  key: string,
  initialValue: () => T
): [T, React.Dispatch<React.SetStateAction<T>>];
export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>];
export function usePersistentState<T>(
  key: string,
  initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const resolvedInitialValue = resolveInitialValue(initialValue);
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : resolvedInitialValue;
    } catch {
      return resolvedInitialValue;
    }
  });

  // Debounce writing to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch {
        // Silently fail if localStorage is unavailable
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [key, state]);

  return [state, setState];
}
