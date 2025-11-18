import { useCallback, useMemo } from 'react';
import { Stack } from '../../styled-system/jsx';
import { Button } from '../components/Button';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { Table } from '../components/Table';
import { usePersistentState } from '../hooks/usePersistentState';

export function UrlParser() {
  const [input, setInput] = usePersistentState('urlParser.input', '');

  const { parsedData, queryJson, errorMessage } = useMemo(() => {
    if (input.trim() === '') {
      return { parsedData: undefined, queryJson: '', errorMessage: '' };
    }

    try {
      const url = new URL(input);
      const params = Object.fromEntries(url.searchParams);

      return {
        parsedData: url,
        queryJson: JSON.stringify(params, null, 2),
        errorMessage: '',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          parsedData: undefined,
          queryJson: '',
          errorMessage: error.message,
        };
      }
      return {
        parsedData: undefined,
        queryJson: '',
        errorMessage: 'Unknown error',
      };
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
