import { useState, useCallback, useEffect } from 'react';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { CopyButton } from '../components/CopyButton';
import { Select } from '../components/Select';
import { convertCase, caseOptions, type CaseType } from '../util/string-case';
import { Screen } from '../components/Screen';

export function StringCaseConverter() {
  const [input, setInput] = usePersistentState('stringCaseConverter.input', '');
  const [caseType, setCaseType] = usePersistentState<CaseType>(
    'stringCaseConverter.caseType',
    'lower'
  );
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (input !== '') {
      handleChange(input);
    }
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setInput(value);
      setOutput(convertCase(value, caseType));
    },
    [caseType]
  );

  useEffect(() => {
    handleChange(input);
  }, [caseType, input, handleChange]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  const handleCaseTypeChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCaseType(event.target.value as CaseType);
    },
    []
  );

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
        <Editor label="Input" value={input} onChange={handleChange} />
      </Panel>
      <Panel
        fullHeight
        label="Output"
        actions={
          <>
            <Select
              accessibleLabel="Case type"
              id="case-type"
              options={caseOptions}
              value={caseType}
              onChange={handleCaseTypeChange}
            />
            <CopyButton value={output} />
          </>
        }
      >
        <Editor label="Output" value={output} />
      </Panel>
    </Screen>
  );
}
