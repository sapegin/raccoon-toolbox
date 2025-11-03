import { getModifierKey } from './getModifierKey';

/** Returns platform-specific shortcut: modifier plus a given key. */
export function getShortcut(key: string): string {
  const modifierKey = getModifierKey();
  return [modifierKey, key].join(modifierKey === '⌘' ? '' : '+');
}
