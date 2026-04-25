import type { ComponentProps, ReactNode } from 'react';

export function InputBox(props: ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className="
        w-full [appearance:textfield] rounded-input border border-light-border
        bg-text-background p-2 font-mono text-base/none text-text-foreground
        shadow-input outline-0
        placeholder:text-secondary-text-foreground
        focus-visible:border-active-border
        disabled:opacity-60
        [&::-webkit-inner-spin-button]:cursor-pointer
      "
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
