type ModifierKey = '⌘' | 'Ctrl';

let cachedModifierKey: ModifierKey | undefined;

/** Returns platform-specific modifier key for keyboard shortcuts. */
export function getModifierKey(): ModifierKey {
  if (cachedModifierKey) {
    return cachedModifierKey;
  }

  // SSR safety: return 'Ctrl' as default when window is not available
  if (typeof window === 'undefined') {
    return 'Ctrl';
  }

  const isMac =
    navigator.platform.toUpperCase().includes('MAC') ||
    navigator.userAgent.toUpperCase().includes('MAC');

  cachedModifierKey = isMac ? '⌘' : 'Ctrl';
  return cachedModifierKey;
}
