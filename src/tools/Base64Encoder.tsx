import { useState, useCallback, useEffect } from 'react';
import { Grid } from '../components/Grid';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { ToggleButton } from '../components/ToggleButton';
import { VisuallyHidden } from '../../styled-system/jsx';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { CopyButton } from '../components/CopyButton';

type Mode = 'encode' | 'decode';

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
          const encoded = btoa(value);
          setOutput(encoded);
          setErrorMessage('');
        } else {
          const decoded = atob(value);
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
    <>
      <VisuallyHidden as="h2">Base64 encoder/decoder</VisuallyHidden>
      <Grid gridTemplateColumns="1fr 1fr" gap="m" height="100vh" padding="s">
        <Panel
          fullHeight
          label="Input"
          actions={
            <Button onClick={handleClear} disabled={input === ''}>
              Clear
            </Button>
          }
        >
          <Editor value={input} onChange={handleChange} />
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
          <Editor value={output} editable={false} />
        </Panel>
      </Grid>
    </>
  );
}
