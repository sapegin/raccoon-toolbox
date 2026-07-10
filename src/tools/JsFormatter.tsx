import prettierPluginBabel from 'prettier/plugins/babel';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettier from 'prettier/standalone';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';

export function JsFormatter() {
  const [input, setInput] = usePersistentState('jsFormatter.input', '');
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = useCallback((value: string) => {
    setInput(value);
    const formatJavaScript = async () => {
      try {
        const formatted = await prettier.format(value, {
          parser: 'babel-ts',
          plugins: [prettierPluginBabel, prettierPluginEstree],
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

    void formatJavaScript();
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
          language="javascript"
          onChange={handleChange}
        />
      </Panel>
      <Panel
        fullHeight
        label="Output"
        errorMessage={errorMessage}
        actions={<CopyButton value={output} />}
      >
        <Editor label="Output" value={output} language="javascript" />
      </Panel>
    </Screen>
  );
}
