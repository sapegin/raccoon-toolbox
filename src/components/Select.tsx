import type { ComponentProps, ReactNode } from 'react';
import type { RequiredLabel } from '../types';
import { Icon } from './Icon';

export function Select({
  id,
  label,
  accessibleLabel,
  options,
  actions,
  ...props
}: ComponentProps<'select'> &
  RequiredLabel & {
    id: string;
    options: { value: string; label: string }[];
    actions?: ReactNode;
  }) {
  return (
    <div className="inline-flex flex-col gap-1">
      {label ? (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="typo-body">
            {label}
          </label>
          {actions ? <div className="flex gap-2">{actions}</div> : null}
        </div>
      ) : null}
      {accessibleLabel ? (
        <label htmlFor={id} className="sr-only">
          {accessibleLabel}
        </label>
      ) : null}
      <div className="relative flex rounded-button border border-light-border">
        <select
          {...props}
          className="
            m-0 inline-block h-6 cursor-pointer appearance-none rounded-button
            border-0 bg-text-background pr-4 pl-2 font-body text-sm
            text-text-foreground focus-outline
            focus-visible:outline-2
            disabled:cursor-default disabled:opacity-60
          "
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0.5 z-10 flex items-center">
          <Icon icon="select" className="size-3.5" />
        </div>
      </div>
    </div>
  );
}
