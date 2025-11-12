import { useCallback, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';

// Naïve CSV parser: split by commas, handle quoted values
function parseLine(line: string) {
  const result: string[] = [];
  let value = '';
  let isInQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const character = line[i];
    if (character === '"') {
      if (isInQuotes && line[i + 1] === '"') {
        value += '"';
        // Skip escaped quote
        i++;
      } else {
        isInQuotes = isInQuotes === false;
      }
    } else if (character === ',' && isInQuotes === false) {
      result.push(value);
      value = '';
    } else {
      value += character;
    }
  }
  result.push(value);
  return result.map((v) => v);
}

function parseCsv(text: string): unknown {
  const lines = text.replaceAll('\r\n', '\n').split('\n').filter(Boolean);
  if (lines.length === 0) {
    return [];
  }

  const headers = parseLine(lines[0]);

  const rows = lines.slice(1).map((l) => {
    const values = parseLine(l);
    const rowObject: Record<string, unknown> = {};
    for (let i = 0; i < headers.length; i++) {
      const key = headers[i] ?? `column_${i}`;
      const val = values[i] ?? '';
      // Try to parse numbers, booleans and null
      if (val === '') {
        rowObject[key] = '';
      } else if (/^\d+$/.test(val) || /^\d+\.\d+$/.test(val)) {
        rowObject[key] = Number(val);
      } else if (/^(true|false)$/i.test(val)) {
        rowObject[key] = val.toLowerCase() === 'true';
      } else if (/^null$/i.test(val)) {
        rowObject[key] = null;
      } else {
        rowObject[key] = val;
      }
    }
    return rowObject;
  });

  return rows;
}

export function CsvToJson() {
  const [input, setInput] = usePersistentState('csvToJson.input', '');
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (input !== '') {
      handleChange(input);
    }
  }, []);

  const handleChange = useCallback((value: string) => {
    setInput(value);
    try {
      const parsed = parseCsv(value);
      setErrorMessage('');
      setOutput(JSON.stringify(parsed, null, 2));
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
        label="CSV"
        actions={
          <Button onClick={handleClear} disabled={input === ''}>
            Clear
          </Button>
        }
      >
        <Editor label="CSV" value={input} onChange={handleChange} />
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
