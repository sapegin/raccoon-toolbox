import clsx from 'clsx';
import { Fragment, type ReactNode } from 'react';
import type { RequiredLabel } from '../types';

interface ToggleButtonOption {
  value: string;
  label: ReactNode;
}

type ToggleButtonProps = RequiredLabel & {
  name: string;
  value: string;
  options: ToggleButtonOption[];
  actions?: ReactNode;
  onChange: (value: string) => void;
};

export function ToggleButton({
  label,
  accessibleLabel,
  name,
  value,
  options,
  actions,
  onChange,
}: ToggleButtonProps) {
  return (
    <fieldset className="inline-flex flex-col gap-1">
      {label ? (
        <div className="flex items-center justify-between">
          <legend className="typo-body">{label}</legend>
          {actions ? (
            <div className="flex flex-row gap-2">{actions}</div>
          ) : null}
        </div>
      ) : null}
      {accessibleLabel ? (
        <legend className="sr-only">{accessibleLabel}</legend>
      ) : null}
      <div
        className="
          inline-flex h-6 rounded-button border border-light-border
          shadow-button
        "
      >
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          const isChecked = value === option.value;
          return (
            <Fragment key={option.value}>
              <input
                type="radio"
                id={id}
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={(e) => onChange(e.target.value)}
                className="absolute size-0 opacity-0"
              />
              <label
                htmlFor={id}
                className={clsx(
                  `
                    inline-flex h-full cursor-pointer items-center
                    justify-center border-0 px-2 text-sm outline-0
                    transition-all duration-(--duration-hover) ease-hover
                    select-none
                    first-of-type:rounded-l-[5px]
                    last-of-type:rounded-r-[5px]
                    [input:focus-visible+&]:z-10
                    [input:focus-visible+&]:outline-2
                    [input:focus-visible+&]:outline-offset-(--border-width-focus-offset)
                    [input:focus-visible+&]:outline-accent
                  `,
                  isChecked
                    ? `
                      bg-(image:--gradient-button-pressed)
                      text-button-pressed-foreground shadow-button-pressed
                      text-shadow-button-pressed
                    `
                    : `
                      bg-(image:--gradient-button)
                      text-secondary-button-foreground text-shadow-button
                      hover:bg-hover-background
                    `
                )}
              >
                {option.label}
              </label>
            </Fragment>
          );
        })}
      </div>
    </fieldset>
  );
}
