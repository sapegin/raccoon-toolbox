import type { ReactNode } from 'react';

/** Require either label or accessibleLabel. */
export type RequiredLabel =
  | { label: ReactNode; accessibleLabel?: never }
  | { label?: never; accessibleLabel: ReactNode };
