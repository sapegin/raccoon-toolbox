import { load } from 'js-yaml';
import { useCallback, useMemo } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';

function yamlToJson(yaml: string): string {
  const parsed = load(yaml);
  return JSON.stringify(parsed, null, 2);
}

export function YamlToJson() {
  const [input, setInput] = usePersistentState('yamlToJson.input', '');

  const { output, errorMessage } = useMemo(() => {
    try {
      const json = yamlToJson(input);
      return { output: json, errorMessage: '' };
    } catch (error) {
      if (error instanceof Error) {
        return { output: '', errorMessage: error.message };
      }
      return { output: '', errorMessage: 'Unknown error' };
    }
  }, [input]);

  const handleChange = useCallback((value: string) => {
    setInput(value);
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
  }, []);

  return (
    <Screen gridTemplateColumns="1fr 1fr">
      <Panel
        fullHeight
        label="YAML"
        actions={
          <Button onClick={handleClear} disabled={input === ''}>
            Clear
          </Button>
        }
      >
        <Editor
          label="YAML"
          value={input}
          language="yaml"
          onChange={handleChange}
        />
      </Panel>
      <Panel
        fullHeight
        label="JSON"
        errorMessage={errorMessage}
        actions={<CopyButton value={output} />}
      >
        <Editor label="JSON" value={output} language="json" />
      </Panel>
    </Screen>
  );
}
