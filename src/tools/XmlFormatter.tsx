import prettierPluginXml from '@prettier/plugin-xml';
import prettier from 'prettier/standalone';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';

export function XmlFormatter() {
  const [input, setInput] = usePersistentState('xmlFormatter.input', '');
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (input !== '') {
      handleChange(input);
    }
  }, []);

  const handleChange = useCallback((value: string) => {
    setInput(value);
    const formatXml = async () => {
      try {
        const formatted = await prettier.format(value, {
          parser: 'xml',
          plugins: [prettierPluginXml],
          xmlWhitespaceSensitivity: 'ignore',
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

    void formatXml();
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
        <Editor
          label="Input"
          value={input}
          language="xml"
          onChange={handleChange}
        />
      </Panel>
      <Panel
        fullHeight
        label="Output"
        errorMessage={errorMessage}
        actions={<CopyButton value={output} />}
      >
        <Editor label="Output" value={output} language="xml" />
      </Panel>
    </Screen>
  );
}
