import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { search, searchKeymap } from '@codemirror/search';
import { EditorView, keymap } from '@codemirror/view';
import { useCallback } from 'react';

interface EditorProps {
  value?: string;
  language?: 'javascript' | 'css' | 'json';
  editable?: boolean;
  onChange?: (value: string) => void;
}

const basicSetup = {
  lineNumbers: true,
  highlightActiveLine: true,
};

export function Editor({
  value = '',
  language = 'javascript',
  editable = true,
  onChange,
}: EditorProps) {
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

  const handleChange = useCallback((val: string) => {
    onChange?.(val);
  }, []);

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <CodeMirror
      value={value}
      onChange={handleChange}
      height="100%"
      style={{ flex: 1 }}
      theme={isDark ? 'dark' : 'light'}
      editable={editable}
      basicSetup={basicSetup}
      extensions={[
        getLanguageExtension(),
        search(),
        keymap.of(searchKeymap),
        EditorView.lineWrapping,
      ]}
    />
  );
}
