import { useCallback, useState } from 'react';
import { Button } from './Button';

/**
 * Button to copy a given value to clipboard.
 */
export function CopyButton({ value }: { value?: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const copyValue = async () => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      await navigator.clipboard.writeText(value ?? '');
    };
    void copyValue();
  }, [value]);

  return (
    <Button onClick={handleCopy} disabled={value === ''}>
      {isCopied ? 'Copied!' : 'Copy'}
    </Button>
  );
}
