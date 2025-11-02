let cachedModifierKey: string | undefined;

export function getModifierKey(): string {
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

  cachedModifierKey = isMac ? 'Cmd' : 'Ctrl';
  return cachedModifierKey;
}
