import { useState, useCallback } from 'react';
import { Editor } from '../components/Editor';
import { Grid } from '../components/Grid';
import prettier from 'prettier/standalone';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginBabel from 'prettier/plugins/babel';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';
import { Editor2 } from '../components/Editor2';
import type React from 'react';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleChange = useCallback((val, viewUpdate) => {
    console.log('🔥 handleChange', val);
    // XXX: The moment I uncomment this line, the editor component is recreated
    // on every change
    // setOutput(val);
  }, []);

  // const handleChange = useCallback((value: string) => {
  //   console.log('🔥 handleChange', handleChange);

  //   setInput(value);

  //   const formatJson = async () => {
  //     // setOutput(value);
  //     // try {
  //     //   const formatted = await prettier.format(value, {
  //     //     parser: 'json',
  //     //     plugins: [prettierPluginEstree, prettierPluginBabel],
  //     //   });
  //     //   setOutput(formatted);
  //     // } catch (error) {
  //     //   console.error('Error formatting JSON:', error);
  //     //   setOutput(value);
  //     // }
  //   };

  //   void formatJson();
  // }, []);

  return (
    <Grid gridTemplateColumns="1fr 1fr" gap="l" height="100vh" padding="s">
      <Stack gap="xs">
        <Text>Input:</Text>
        <Editor2 language="json" onChange={handleChange} />
      </Stack>
      <Stack gap="xs">
        <Text>Output:</Text>
        <Editor2 value={output} language="json" editable={false} />
      </Stack>
    </Grid>
  );
}
