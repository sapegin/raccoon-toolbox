import { invoke, isTauri } from '@tauri-apps/api/core';

/** Whether the native screen color sampler is available (Tauri app). */
export function canPickScreenColor(): boolean {
  return isTauri();
}

/**
 * Open the system eyedropper and return `#rrggbb`, or `undefined` if cancelled
 * or unavailable.
 */
export async function pickScreenColor(): Promise<string | undefined> {
  if (canPickScreenColor() === false) {
    return undefined;
  }

  try {
    const color = await invoke<string | null>('pick_screen_color');
    return color ?? undefined;
  } catch {
    return undefined;
  }
}
