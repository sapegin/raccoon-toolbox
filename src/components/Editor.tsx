import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { search, searchKeymap } from '@codemirror/search';
import { EditorView, keymap } from '@codemirror/view';
import { useMemo } from 'react';

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

const editorStyle = { flex: 1 };

export function Editor({
  value = '',
  language = 'javascript',
  editable = true,
  onChange,
}: EditorProps) {
  const extensions = useMemo(() => {
    const languageExtension =
      language === 'javascript'
        ? javascript({ jsx: true, typescript: true })
        : language === 'css'
          ? css()
          : json();

    return [
      languageExtension,
      search(),
      keymap.of(searchKeymap),
      EditorView.lineWrapping,
    ];
  }, [language]);

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      height="100%"
      style={editorStyle}
      editable={editable}
      basicSetup={basicSetup}
      extensions={extensions}
    />
  );
}
