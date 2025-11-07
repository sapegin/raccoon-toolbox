import { useState, useCallback, useEffect } from 'react';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { ToggleButton } from '../components/ToggleButton';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { CopyButton } from '../components/CopyButton';
import { Screen } from '../components/Screen';

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
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (input !== '') {
      handleChange(input);
    }
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setInput(value);
      try {
        if (mode === 'encode') {
          const encoder = new TextEncoder();
          const uint8Array = encoder.encode(value);
          const encoded = uint8Array.toBase64();
          setOutput(encoded);
          setErrorMessage('');
        } else {
          const uint8Array = Uint8Array.fromBase64(value);
          const decoder = new TextDecoder();
          const decoded = decoder.decode(uint8Array);
          setOutput(decoded);
          setErrorMessage('');
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
          setOutput('');
        }
      }
    },
    [mode]
  );

  useEffect(() => {
    handleChange(input);
  }, [mode, input, handleChange]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setErrorMessage('');
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
