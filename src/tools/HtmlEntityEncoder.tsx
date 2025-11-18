import { useCallback, useMemo } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { ToggleButton } from '../components/ToggleButton';
import { usePersistentState } from '../hooks/usePersistentState';

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

  const { output, errorMessage } = useMemo(() => {
    if (input === '') {
      return { output: '', errorMessage: '' };
    }

    try {
      if (mode === 'encode') {
        const encoded = encodeHtmlEntities(input);
        return { output: encoded, errorMessage: '' };
      } else {
        const decoded = decodeHtmlEntities(input);
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
        <Editor
          label="Output"
          value={output}
          language={mode === 'decode' ? 'html' : undefined}
        />
      </Panel>
    </Screen>
  );
}
