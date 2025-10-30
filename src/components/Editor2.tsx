import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export function Editor2({ value, defaultValue, onChange }: { value?: string }) {
  const [innerValue, setValue] = React.useState(defaultValue);
  const handleChange = React.useCallback((val, viewUpdate) => {
    onChange?.(val);
    console.log('val:', val);
    setValue(val);
  }, []);

  useEffect(() => console.log('editor created'), []);

  return (
    <CodeMirror
      value={innerValue}
      height="200px"
      extensions={[javascript({ jsx: true })]}
      onChange={handleChange}
    />
  );
}
