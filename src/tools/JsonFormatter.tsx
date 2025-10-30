import { useState, useCallback, useEffect } from 'react';
import { Grid } from '../components/Grid';
import prettier from 'prettier/standalone';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginBabel from 'prettier/plugins/babel';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';
import { Editor } from '../components/Editor';
import { ErrorMessage } from '../components/ErrorMessage';
import { Flex } from '../components/Flex';
import { Button } from '../components/Button';
import { VisuallyHidden } from '../../styled-system/jsx';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';

export function JsonFormatter() {
  const [input, setInput] = usePersistentState('jsonFormatter.input', '');
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

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

  return (
    <>
      <VisuallyHidden as="h2">JSON Formatter</VisuallyHidden>
      <Grid gridTemplateColumns="1fr 1fr" gap="m" height="100vh" padding="s">
        <Panel
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
          label="Output"
          errorMessage={errorMessage}
          actions={
            <Button onClick={handleCopy} disabled={output === ''}>
              {isCopied ? 'Copied!' : 'Copy'}
            </Button>
          }
        >
          <Editor value={output} language="json" editable={false} />
        </Panel>
      </Grid>
    </>
  );
}
