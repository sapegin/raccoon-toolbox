import { useCallback, useState } from 'react';
import { Button } from './Button';

/**
 * Button to copy a given value to clipboard.
 */
export function CopyButton({ value }: { value?: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const isDisabled = value === '' || isCopied;

  const handleCopy = useCallback(() => {
    const copyValue = async () => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
      await navigator.clipboard.writeText(value ?? '');
    };
    void copyValue();
  }, [value]);

  return (
    <Button onClick={handleCopy} disabled={isDisabled}>
      Copy
    </Button>
  );
}
