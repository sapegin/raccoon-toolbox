import { useState, useCallback, useEffect } from 'react';
import { Grid } from '../components/Grid';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { ToggleButton } from '../components/ToggleButton';
import { VisuallyHidden } from '../../styled-system/jsx';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';

type Mode = 'encode' | 'decode';

// TODO: Make a hook for copy button to manage button label, etc.

export function Base64() {
  const [input, setInput] = usePersistentState('base64.input', '');
  const [mode, setMode] = usePersistentState<Mode>('base64.mode', 'encode');
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

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

  const handleCopy = useCallback(() => {
    const copyOutput = async () => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      await navigator.clipboard.writeText(output);
    };
    void copyOutput();
  }, [output]);

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
      <VisuallyHidden as="h2">Base64 Encoder/Decoder</VisuallyHidden>
      <Grid gridTemplateColumns="1fr 1fr" gap="m" height="100vh" padding="s">
        <Panel
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
              <Button onClick={handleCopy} disabled={output === ''}>
                {isCopied ? 'Copied!' : 'Copy'}
              </Button>
            </>
          }
        >
          <Editor value={output} editable={false} />
        </Panel>
      </Grid>
    </>
  );
}
