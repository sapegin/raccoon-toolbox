import clsx from 'clsx';
import type { ComponentProps, ReactNode } from 'react';
import { ErrorMessage } from './ErrorMessage';

export function Panel({
  label,
  accessibleLabel,
  actions,
  errorMessage,
  fullHeight,
  noPadding,
  children,
  className,
  ...props
}: ComponentProps<'div'> & {
  label?: ReactNode;
  accessibleLabel?: ReactNode;
  /** Actions shown on the right side of the label (such as Copy button). */
  actions?: ReactNode;
  /** Show an error message overlay instead of the panel content. */
  errorMessage?: string;
  fullHeight?: boolean;
  noPadding?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      {...props}
      className={clsx(
        'flex flex-col gap-1',
        fullHeight && 'h-full min-h-0',
        noPadding ?? 'p-2',
        className
      )}
    >
      {accessibleLabel ? (
        <h3 className="sr-only">{accessibleLabel}</h3>
      ) : (
        <div className="flex items-center justify-between">
          <h3 className="typo-body font-bold">{label}</h3>
          {actions ? (
            <div className="flex flex-row items-center gap-2">{actions}</div>
          ) : null}
        </div>
      )}
      <div className="relative -m-2 h-full min-h-0 overflow-auto p-2">
        {errorMessage && (
          <ErrorMessage className="absolute inset-0 z-99 m-2 overflow-auto">
            {errorMessage}
          </ErrorMessage>
        )}
        {children}
      </div>
    </div>
  );
}
