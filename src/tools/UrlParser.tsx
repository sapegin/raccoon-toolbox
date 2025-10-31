import { useState, useCallback, useEffect } from 'react';
import { Grid } from '../components/Grid';
import { Stack } from '../components/Stack';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { VisuallyHidden } from '../../styled-system/jsx';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { Table } from '../components/Table';

export function UrlParser() {
  const [input, setInput] = usePersistentState('urlParser.input', '');
  const [parsedData, setParsedData] = useState<
    | {
        protocol: string;
        host: string;
        pathname: string;
        search: string;
      }
    | undefined
  >(undefined);
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

      setParsedData({
        protocol: url.protocol,
        host: url.host,
        pathname: url.pathname,
        search: url.search,
      });

      const params: Record<string, string | string[]> = {};
      for (const [key, val] of url.searchParams.entries()) {
        if (params[key]) {
          if (Array.isArray(params[key])) {
            params[key].push(val);
          } else {
            params[key] = [params[key], val];
          }
        } else {
          params[key] = val;
        }
      }

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
    <>
      <VisuallyHidden as="h2">URL parser</VisuallyHidden>
      <Grid gridTemplateColumns="1fr 1fr" gap="m" height="100vh" padding="s">
        <Panel
          label="Input"
          actions={
            <Button onClick={handleClear} disabled={input === ''}>
              Clear
            </Button>
          }
        >
          <Editor value={input} onChange={handleChange} />
        </Panel>
        <Stack gap="m">
          <Panel label="URL Components" errorMessage={errorMessage}>
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
          <Panel label="Query Parameters (JSON)">
            <Editor value={queryJson} language="json" editable={false} />
          </Panel>
        </Stack>
      </Grid>
    </>
  );
}
