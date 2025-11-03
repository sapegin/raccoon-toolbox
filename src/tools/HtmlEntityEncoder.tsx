import { useState, useCallback, useEffect } from 'react';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { ToggleButton } from '../components/ToggleButton';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { CopyButton } from '../components/CopyButton';
import { Screen } from '../components/Screen';

type Mode = 'encode' | 'decode';

function encodeHtmlEntities(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export function HtmlEntityEncoder() {
  const [input, setInput] = usePersistentState('htmlEntityEncoder.input', '');
  const [mode, setMode] = usePersistentState<Mode>(
    'htmlEntityEncoder.mode',
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
          const encoded = encodeHtmlEntities(value);
          setOutput(encoded);
          setErrorMessage('');
        } else {
          const decoded = decodeHtmlEntities(value);
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
        <Editor
          label="Input"
          value={input}
          language={mode === 'encode' ? 'html' : undefined}
          onChange={handleChange}
        />
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
        <Editor
          label="Output"
          value={output}
          language={mode === 'decode' ? 'html' : undefined}
        />
      </Panel>
    </Screen>
  );
}
