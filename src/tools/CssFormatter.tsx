import { useState, useCallback, useEffect } from 'react';
import prettier from 'prettier/standalone';
import prettierPluginCss from 'prettier/plugins/postcss';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { CopyButton } from '../components/CopyButton';
import { Screen } from '../components/Screen';

export function CssFormatter() {
  const [input, setInput] = usePersistentState('cssFormatter.input', '');
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (input !== '') {
      handleChange(input);
    }
  }, []);

  const handleChange = useCallback((value: string) => {
    setInput(value);
    const formatCss = async () => {
      try {
        const formatted = await prettier.format(value, {
          parser: 'css',
          plugins: [prettierPluginCss],
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

    void formatCss();
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
          language="css"
          onChange={handleChange}
        />
      </Panel>
      <Panel
        fullHeight
        label="Output"
        errorMessage={errorMessage}
        actions={<CopyButton value={output} />}
      >
        <Editor label="Output" value={output} language="css" />
      </Panel>
    </Screen>
  );
}
