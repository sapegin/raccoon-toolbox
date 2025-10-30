import { useState, useCallback } from 'react';
import { Editor } from '../components/Editor';
import { Grid } from '../components/Grid';
import prettier from 'prettier/standalone';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginBabel from 'prettier/plugins/babel';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatJson = useCallback(async (value: string) => {
    try {
      const formatted = await prettier.format(value, {
        parser: 'json',
        plugins: [prettierPluginEstree, prettierPluginBabel],
      });
      setOutput(formatted);
    } catch (error) {
      console.error('Error formatting JSON:', error);
      setOutput(value);
    }
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      void formatJson(value);
    },
    [formatJson]
  );

  return (
    <Grid gridTemplateColumns="1fr 1fr" gap="l" height="100vh" padding="s">
      <Stack gap="xs">
        <Text>Input:</Text>
        <Editor value={input} language="json" onChange={handleInputChange} />
      </Stack>
      <Stack gap="xs">
        <Text>Output:</Text>
        <Editor value={output} language="json" editable={false} />
      </Stack>
    </Grid>
  );
}
