import { dump } from 'js-yaml';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';
import { stripJsonComments } from '../util/stripJsonComments';

function jsonToYaml(json: unknown): string {
  return dump(json, { indent: 2 });
}

export function JsonToYaml() {
  const [input, setInput] = usePersistentState('jsonToYaml.input', '');
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (input !== '') {
      handleChange(input);
    }
  }, []);

  const handleChange = useCallback((value: string) => {
    setInput(value);
    if (value === '') {
      setErrorMessage('');
      setOutput('');
      return;
    }

    try {
      const parsed: unknown = JSON.parse(stripJsonComments(value));
      const yaml = jsonToYaml(parsed);
      setErrorMessage('');
      setOutput(yaml);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setOutput('');
      }
    }
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
        label="JSON"
        actions={
          <Button onClick={handleClear} disabled={input === ''}>
            Clear
          </Button>
        }
      >
        <Editor
          label="JSON"
          value={input}
          language="json"
          onChange={handleChange}
        />
      </Panel>
      <Panel
        fullHeight
        label="YAML"
        errorMessage={errorMessage}
        actions={<CopyButton value={output} />}
      >
        <Editor label="YAML" value={output} language="yaml" />
      </Panel>
    </Screen>
  );
}
