import { useCallback, useMemo } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { ToggleButton } from '../components/ToggleButton';
import { usePersistentState } from '../hooks/usePersistentState';
import { stripJsonComments } from '../util/stripJsonComments';

type Mode = 'json-to-csv' | 'csv-to-json';

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

function parseLine(line: string) {
  const result: string[] = [];
  let value = '';
  let isInQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const character = line[i];
    if (character === '"') {
      if (isInQuotes && line[i + 1] === '"') {
        value += '"';
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

function csvToJson(text: string): unknown {
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

export function JsonCsv() {
  const [input, setInput] = usePersistentState('jsonCsv.input', '');
  const [mode, setMode] = usePersistentState<Mode>(
    'jsonCsv.mode',
    'json-to-csv'
  );

  const { output, errorMessage } = useMemo(() => {
    if (input === '') {
      return { output: '', errorMessage: '' };
    }

    try {
      if (mode === 'json-to-csv') {
        const parsed: unknown = JSON.parse(stripJsonComments(input));
        const csv = jsonToCsv(parsed);
        return { output: csv, errorMessage: '' };
      } else {
        const json = csvToJson(input);
        return { output: JSON.stringify(json, null, 2), errorMessage: '' };
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

  const inputLanguage = mode === 'json-to-csv' ? 'json' : undefined;
  const outputLanguage = mode === 'json-to-csv' ? undefined : 'json';
  const inputLabel = mode === 'json-to-csv' ? 'JSON' : 'CSV';
  const outputLabel = mode === 'json-to-csv' ? 'CSV' : 'JSON';

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
                { value: 'json-to-csv', label: 'JSON → CSV' },
                { value: 'csv-to-json', label: 'CSV → JSON' },
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
