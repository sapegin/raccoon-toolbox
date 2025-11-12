import { useCallback, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { ToggleButton } from '../components/ToggleButton';
import { usePersistentState } from '../hooks/usePersistentState';

type Mode = 'encode' | 'decode';

export function UrlEncoder() {
  const [input, setInput] = usePersistentState('urlEncoder.input', '');
  const [mode, setMode] = usePersistentState<Mode>('urlEncoder.mode', 'encode');
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
          const encoded = encodeURIComponent(value);
          setOutput(encoded);
          setErrorMessage('');
        } else {
          const decoded = decodeURIComponent(value);
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
