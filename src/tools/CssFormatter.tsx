import prettierPluginCss from 'prettier/plugins/postcss';
import prettier from 'prettier/standalone';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';

export function CssFormatter() {
  const [input, setInput] = usePersistentState('cssFormatter.input', '');
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- setInput is stable
  }, []);

  useEffect(() => {
    if (input !== '') {
      handleChange(input);
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- format persisted input on mount only
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setErrorMessage('');
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- setInput is stable
  }, []);

  return (
    <Screen className="grid-cols-2">
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
