import { json } from '@codemirror/lang-json';
import { search, searchKeymap } from '@codemirror/search';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightWhitespace,
} from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { useRef, useEffect } from 'react';
import { Box } from './Box';

interface EditorProps {
  value?: string;
  language?: 'json';
  editable?: boolean;
  onChange?: (value: string) => void;
}

const theme = EditorView.theme({
  '&': {
    height: '100%',
  },
  '&.cm-focused': {
    outline: '1px solid var(--colors-active-border)',
  },
  '.cm-scroller': {
    overflow: 'auto',
    fontFamily: 'var(--fonts-code)',
  },
  '.cm-activeLine': {
    backgroundColor: 'var(--colors-line-highlight-background)',
  },
  '.cm-highlightSpace': {
    backgroundImage:
      'radial-gradient(circle at 50% 55%, var(--colors-light-border) 20%, transparent 5%)',
  },
  '.cm-gutters': {
    color: 'var(--colors-disabled-foreground)',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
});

// All available tags:
// https://lezer.codemirror.net/docs/ref/#highlight.tags
const squirrelsongHighlighting = syntaxHighlighting(
  HighlightStyle.define([
    { tag: tags.keyword, color: 'var(--colors-code-keyword)' },
    { tag: tags.comment, color: 'var(--colors-code-comment)' },
    { tag: tags.variableName, color: 'var(--colors-code-variable)' },
    { tag: tags.propertyName, color: 'var(--colors-code-variable)' },
    { tag: tags.string, color: 'var(--colors-code-string)' },
    { tag: tags.regexp, color: 'var(--colors-code-string)' },
    { tag: tags.number, color: 'var(--colors-code-value)' },
    { tag: tags.bool, color: 'var(--colors-code-value)' },
    { tag: tags.null, color: 'var(--colors-code-value)' },
    { tag: tags.operator, color: 'var(--colors-code-operator)' },
    { tag: tags.punctuation, color: 'var(--colors-code-punctuation)' },
  ])
);

export function Editor({
  value = '',
  language,
  editable = true,
  onChange,
}: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current === null) {
      return;
    }

    const languageExtension = language === 'json' ? json() : undefined;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged && onChange) {
        onChange(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: value,
      extensions: [
        languageExtension,
        updateListener,
        lineNumbers(),
        highlightActiveLine(),
        highlightWhitespace(),
        search(),
        keymap.of(searchKeymap),
        EditorView.lineWrapping,
        EditorView.editable.of(editable),
        squirrelsongHighlighting,
        theme,
      ].filter((x) => x !== undefined),
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [language, editable, onChange]);

  useEffect(() => {
    const view = viewRef.current;
    if (view === null) {
      return;
    }

    const currentValue = view.state.doc.toString();
    if (currentValue !== value) {
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value },
      });
    }
  }, [value]);

  return (
    <Box
      ref={editorRef}
      height="100%"
      minHeight={0}
      border="1px solid"
      borderColor="lightBorder"
    />
  );
}
