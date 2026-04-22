import type { ReactNode } from 'react';

/**
 * Shows a value in large type with a label as <dt>/<dd>. Must be rendered
 * inside <dl>.
 */
export function LargeValue({
  label,
  value,
}: {
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="typo-body">{label}</dt>
      <dd className="typo-large">{value}</dd>
    </div>
  );
}
