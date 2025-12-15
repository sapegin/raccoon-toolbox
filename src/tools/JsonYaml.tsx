import { useCallback, useMemo } from 'react';
import { parse, stringify } from 'yaml';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { ToggleButton } from '../components/ToggleButton';
import { usePersistentState } from '../hooks/usePersistentState';
import { stripJsonComments } from '../util/stripJsonComments';

type Mode = 'json-to-yaml' | 'yaml-to-json';

function jsonToYaml(json: unknown): string {
  return stringify(json, { indent: 2 });
}

function yamlToJson(yaml: string): string {
  const parsed = parse(yaml);
  return JSON.stringify(parsed, null, 2);
}

export function JsonYaml() {
  const [input, setInput] = usePersistentState('jsonYaml.input', '');
  const [mode, setMode] = usePersistentState<Mode>(
    'jsonYaml.mode',
    'json-to-yaml'
  );

  const { output, errorMessage } = useMemo(() => {
    if (input === '') {
      return { output: '', errorMessage: '' };
    }

    try {
      if (mode === 'json-to-yaml') {
        const parsed: unknown = JSON.parse(stripJsonComments(input));
        const yaml = jsonToYaml(parsed);
        return { output: yaml, errorMessage: '' };
      } else {
        const json = yamlToJson(input);
        return { output: json, errorMessage: '' };
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

  const inputLanguage = mode === 'json-to-yaml' ? 'json' : 'yaml';
  const outputLanguage = mode === 'json-to-yaml' ? 'yaml' : 'json';
  const inputLabel = mode === 'json-to-yaml' ? 'JSON' : 'YAML';
  const outputLabel = mode === 'json-to-yaml' ? 'YAML' : 'JSON';

  return (
    <Screen gridTemplateColumns="1fr 1fr">
      <Panel
        fullHeight
        label={inputLabel}
        actions={
          <Button onClick={handleClear} disabled={input === ''}>
            Clear
          </Button>
        }
      >
        <Editor
          label={inputLabel}
          value={input}
          language={inputLanguage}
          onChange={handleChange}
        />
      </Panel>
      <Panel
        fullHeight
        label={outputLabel}
        errorMessage={errorMessage}
        actions={
          <>
            <ToggleButton
              accessibleLabel="Conversion direction"
              name="mode"
              value={mode}
              options={[
                { value: 'json-to-yaml', label: 'JSON → YAML' },
                { value: 'yaml-to-json', label: 'YAML → JSON' },
              ]}
              onChange={handleModeChange}
            />
            <CopyButton value={output} />
          </>
        }
      >
        <Editor label={outputLabel} value={output} language={outputLanguage} />
      </Panel>
    </Screen>
  );
}
