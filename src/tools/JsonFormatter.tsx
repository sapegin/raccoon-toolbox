import { useState, useCallback, useEffect } from 'react';
import prettier from 'prettier/standalone';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginBabel from 'prettier/plugins/babel';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { CopyButton } from '../components/CopyButton';
import { Screen } from '../components/Screen';

export function JsonFormatter() {
  const [input, setInput] = usePersistentState('jsonFormatter.input', '');
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (input !== '') {
      handleChange(input);
    }
  }, []);

  const handleChange = useCallback((value: string) => {
    setInput(value);
    const formatJson = async () => {
      try {
        const formatted = await prettier.format(value, {
          parser: 'json',
          plugins: [prettierPluginEstree, prettierPluginBabel],
        });
        setErrorMessage('');
        setOutput(formatted);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
          setOutput('');
        }
      }
    };

    void formatJson();
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setErrorMessage('');
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
        <Editor value={input} language="json" onChange={handleChange} />
      </Panel>
      <Panel
        fullHeight
        label="Output"
        errorMessage={errorMessage}
        actions={<CopyButton value={output} />}
      >
        <Editor value={output} language="json" editable={false} />
      </Panel>
    </Screen>
  );
}
