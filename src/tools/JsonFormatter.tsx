import { useState, useCallback } from 'react';
import { Grid } from '../components/Grid';
import prettier from 'prettier/standalone';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginBabel from 'prettier/plugins/babel';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';
import { Editor } from '../components/Editor';
import { ErrorMessage } from '../components/ErrorMessage';

export function JsonFormatter() {
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = useCallback((value: string) => {
    const formatJson = async () => {
      try {
        const formatted = await prettier.format(value, {
          parser: 'json',
          plugins: [prettierPluginEstree, prettierPluginBabel],
        });
        setErrorMessage('');
        setOutput(formatted);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
          setOutput('');
        }
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
      <Stack gap="xs" position="relative">
        {errorMessage && (
          <ErrorMessage position="absolute" inset={0} zIndex={99} p="m">
            {errorMessage}
          </ErrorMessage>
        )}
        <Text>Output:</Text>
        <Editor value={output} language="json" editable={false} />
      </Stack>
    </Grid>
  );
}
