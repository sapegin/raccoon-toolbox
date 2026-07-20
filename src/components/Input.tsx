import { type ComponentProps, type ReactNode } from 'react';

export function InputBox(props: ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className="rounded-input border-light-border bg-text-background text-text-foreground shadow-input placeholder:text-secondary-text-foreground focus-visible:border-active-border w-full [appearance:textfield] border p-2 font-mono text-base/none outline-0 disabled:opacity-60"
    />
  );
}

export function Input({
  id,
  label,
  actions,
  errorMessage,
  ...props
}: ComponentProps<'input'> & {
  id: string;
  label: ReactNode;
  /** Actions shown on the right side of the label (such as Copy button). */
  actions?: ReactNode;
  /** Show an error message under the input field. */
  errorMessage?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="typo-body">
          {label}
        </label>
        <div className="flex gap-2">{actions}</div>
      </div>
      <div className="flex flex-col gap-2">
        <InputBox id={id} {...props} />
        {errorMessage && <p className="typo-error">{errorMessage}</p>}
      </div>
    </div>
  );
}
