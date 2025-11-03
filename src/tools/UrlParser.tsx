import { useState, useCallback, useEffect } from 'react';
import { Stack } from '../components/Stack';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { Table } from '../components/Table';
import { Screen } from '../components/Screen';

export function UrlParser() {
  const [input, setInput] = usePersistentState('urlParser.input', '');
  const [parsedData, setParsedData] = useState<URL>();
  const [queryJson, setQueryJson] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (input !== '') {
      handleChange(input);
    }
  }, []);

  const handleChange = useCallback((value: string) => {
    setInput(value);

    if (value.trim() === '') {
      setParsedData(undefined);
      setQueryJson('');
      setErrorMessage('');
      return;
    }

    try {
      const url = new URL(value);
      const params = Object.fromEntries(url.searchParams);

      setParsedData(url);
      setQueryJson(JSON.stringify(params, null, 2));
      setErrorMessage('');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setParsedData(undefined);
        setQueryJson('');
      }
    }
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setParsedData(undefined);
    setQueryJson('');
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
        <Editor label="Input" value={input} onChange={handleChange} />
      </Panel>
      <Stack gap="m">
        <Panel label="URL Components">
          {parsedData && (
            <Table>
              <tbody>
                <tr>
                  <th>Protocol</th>
                  <td>{parsedData.protocol}</td>
                </tr>
                <tr>
                  <th>Host</th>
                  <td>{parsedData.host}</td>
                </tr>
                <tr>
                  <th>Path</th>
                  <td>{parsedData.pathname}</td>
                </tr>
                <tr>
                  <th>Query string</th>
                  <td>{parsedData.search}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Panel>
        <Panel fullHeight label="Query parameters" errorMessage={errorMessage}>
          <Editor label="Query parameters" value={queryJson} language="json" />
        </Panel>
      </Stack>
    </Screen>
  );
}
