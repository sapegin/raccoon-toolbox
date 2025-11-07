import { useState, useCallback, useEffect } from 'react';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { CopyButton } from '../components/CopyButton';
import { Screen } from '../components/Screen';
import { stripJsonComments } from '../util/stripJsonComments';

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  let stringValue: string;
  if (typeof value === 'object') {
    stringValue = JSON.stringify(value);
  } else if (typeof value === 'string') {
    stringValue = value;
  } else if (typeof value === 'number' || typeof value === 'boolean') {
    stringValue = String(value);
  } else {
    stringValue = '';
  }
  if (
    stringValue.includes(',') ||
    stringValue.includes('"') ||
    stringValue.includes('\n')
  ) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }
  return stringValue;
}

function jsonToCsv(json: unknown): string {
  if (Array.isArray(json) === false) {
    throw new TypeError('JSON must be an array of objects');
  }

  if (json.length === 0) {
    return '';
  }

  const headers = new Set<string>();
  for (const row of json) {
    if (typeof row !== 'object' || row === null) {
      throw new Error('Each item in the array must be an object');
    }
    for (const key of Object.keys(row as Record<string, unknown>)) {
      headers.add(key);
    }
  }

  const headerArray = Array.from(headers);

  const rows = json.map((row) => {
    return headerArray
      .map((header) => escapeCsvValue((row as Record<string, unknown>)[header]))
      .join(',');
  });

  return [headerArray.join(','), ...rows].join('\n');
}

export function JsonToCsv() {
  const [input, setInput] = usePersistentState('jsonToCsv.input', '');
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
      const csv = jsonToCsv(parsed);
      setErrorMessage('');
      setOutput(csv);
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
        label="CSV"
        errorMessage={errorMessage}
        actions={<CopyButton value={output} />}
      >
        <Editor label="CSV" value={output} />
      </Panel>
    </Screen>
  );
}
