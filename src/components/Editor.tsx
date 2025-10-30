import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { search, searchKeymap } from '@codemirror/search';
import { keymap } from '@codemirror/view';
import { useState } from 'react';

interface EditorProps {
  defaultValue?: string;
  language?: 'javascript' | 'css' | 'json';
  onChange?: (value: string) => void;
}

export function Editor({
  defaultValue = '',
  language = 'javascript',
  onChange,
}: EditorProps) {
  const [value, setValue] = useState(defaultValue);

  const getLanguageExtension = () => {
    switch (language) {
      case 'javascript':
        return javascript({ jsx: true, typescript: true });
      case 'css':
        return css();
      case 'json':
        return json();
      default:
        return javascript();
    }
  };

  const handleChange = (val: string) => {
    setValue(val);
    onChange?.(val);
  };

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <CodeMirror
      value={value}
      onChange={handleChange}
      extensions={[getLanguageExtension(), search(), keymap.of(searchKeymap)]}
      height="100%"
      theme={isDark ? 'dark' : 'light'}
    />
  );
}
