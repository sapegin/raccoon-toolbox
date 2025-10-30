import { useState, useCallback, useEffect } from 'react';
import { Grid } from '../components/Grid';
import prettier from 'prettier/standalone';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginBabel from 'prettier/plugins/babel';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';
import { Editor } from '../components/Editor';

export function JsonFormatter() {
  const [output, setOutput] = useState('');

  const handleChange = useCallback((value: string) => {
    const formatJson = async () => {
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
    };

    void formatJson();
  }, []);

  return (
    <Grid gridTemplateColumns="1fr 1fr" gap="l" height="100vh" padding="s">
      <Stack gap="xs">
        <Text>Input:</Text>
        <Editor language="json" onChange={handleChange} />
      </Stack>
      <Stack gap="xs">
        <Text>Output:</Text>
        <Editor value={output} language="json" editable={false} />
      </Stack>
    </Grid>
  );
}
