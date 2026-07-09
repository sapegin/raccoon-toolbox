/** Extracts a tool ID from a router pathname like `/color-converter/`. */
export function getToolIdFromPath(pathname: string): string {
  return pathname.replaceAll(/[^-\w]/g, '');
}
