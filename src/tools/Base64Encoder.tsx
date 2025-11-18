import { useCallback, useMemo } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { ToggleButton } from '../components/ToggleButton';
import { usePersistentState } from '../hooks/usePersistentState';

type Mode = 'encode' | 'decode';

// HACK: New API. These types should be available in TypeScript 6
declare global {
  interface Uint8Array {
    toBase64(options?: {
      alphabet?: 'base64' | 'base64url';
      omitPadding?: boolean;
    }): string;
  }
  interface Uint8ArrayConstructor {
    fromBase64(base64: string): Uint8Array;
  }
}

export function Base64Encoder() {
  const [input, setInput] = usePersistentState('base64Encoder.input', '');
  const [mode, setMode] = usePersistentState<Mode>(
    'base64Encoder.mode',
    'encode'
  );

  const { output, errorMessage } = useMemo(() => {
    if (input === '') {
      return { output: '', errorMessage: '' };
    }

    try {
      if (mode === 'encode') {
        const encoder = new TextEncoder();
        const uint8Array = encoder.encode(input);
        const encoded = uint8Array.toBase64();
        return { output: encoded, errorMessage: '' };
      } else {
        const uint8Array = Uint8Array.fromBase64(input);
        const decoder = new TextDecoder();
        const decoded = decoder.decode(uint8Array);
        return { output: decoded, errorMessage: '' };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { output: '', errorMessage: error.message };
      }
      return { output: '', errorMessage: 'Unknown error' };
    }
  }, [input, mode]);

  const handleChange = useCallback((value: string) => {
    setInput(value);
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
  }, []);

  const handleModeChange = useCallback((value: string) => {
    setMode(value as Mode);
  }, []);

  return (
    <Screen gridTemplateColumns="1fr 1fr">
      <Panel
        fullHeight
        label="Input"
        actions={
          <Button onClick={handleClear} disabled={input === ''}>
            Clear
          </Button>
        }
      >
        <Editor label="Input" value={input} onChange={handleChange} />
      </Panel>
      <Panel
        fullHeight
        label="Output"
        errorMessage={errorMessage}
        actions={
          <>
            <ToggleButton
              accessibleLabel="Conversion direction"
              name="mode"
              value={mode}
              options={[
                { value: 'encode', label: 'Encode' },
                { value: 'decode', label: 'Decode' },
              ]}
              onChange={handleModeChange}
            />
            <CopyButton value={output} />
          </>
        }
      >
        <Editor label="Output" value={output} />
      </Panel>
    </Screen>
  );
}
