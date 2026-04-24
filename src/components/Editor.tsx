import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { xml } from '@codemirror/lang-xml';
import { yaml } from '@codemirror/lang-yaml';
import {
  HighlightStyle,
  type LanguageSupport,
  syntaxHighlighting,
} from '@codemirror/language';
import { gotoLine, search, searchKeymap } from '@codemirror/search';
import { EditorState, StateEffect, StateField } from '@codemirror/state';
import {
  Decoration,
  type DecorationSet,
  EditorView,
  highlightActiveLine,
  highlightWhitespace,
  keymap,
  lineNumbers,
} from '@codemirror/view';
import { tags } from '@lezer/highlight';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

// TODO: Disabled Cmd+/ for commenting as it conflicts with the app toggle sidebar

const languageExtensions = {
  css,
  html,
  javascript: () => javascript({ jsx: true, typescript: true }),
  json,
  xml,
  yaml,
} satisfies Record<string, () => LanguageSupport>;

type Language = keyof typeof languageExtensions;

interface HighlightRange {
  from: number;
  to: number;
}

interface EditorProps {
  /** ID of the editor textarea. */
  id?: string;
  /** Accessible label of the editor textarea. */
  label: string;
  value?: string;
  language?: Language;
  editable?: boolean;
  onChange?: (value: string) => void;
  /** Highlight specific ranges in the editor. */
  highlightRanges?: HighlightRange[];
}

const theme = EditorView.theme({
  '&': {
    height: '100%',
  },
  '.editor_in-page &': {
    border: 'var(--border-input)',
    borderRadius: 'var(--radius-input)',
    boxShadow: 'var(--shadow-input)',
  },
  '&.cm-focused': {
    outline: 0,
  },
  '.editor_in-page &.cm-focused': {
    border: 'var(--border-input-focus)',
  },
  '.cm-scroller': {
    overflow: 'auto',
    fontFamily: 'var(--font-mono)',
  },
  '.cm-activeLine': {
    backgroundColor: 'var(--color-line-highlight-background)',
  },
  '.cm-highlightSpace': {
    backgroundImage:
      'radial-gradient(circle at 50% 55%, var(--color-light-border) 20%, transparent 5%)',
  },
  '.cm-gutters': {
    color: 'var(--color-disabled-foreground)',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  '.cm-searchMatch': {
    backgroundColor: 'var(--color-secondary-match-background)',
  },
  '.cm-searchMatch-selected': {
    outline: '2px solid var(--color-match-background)',
  },
  '.cm-textfield': {
    padding: ' var(--spacing-xs)',
    fontSize: 'var(--text-s)',
    color: 'var(--color-text-foreground)',
    backgroundColor: 'var(--color-text-background)',
    border: 'var(--border-input)',
    borderRadius: 'var(--radius-input)',
    boxShadow: 'var(--shadow-input)',
    outline: 0,
  },
  '.cm-textfield:focus': {
    border: 'var(--border-input-focus)',
  },
  '.cm-panel': {
    color: 'var(--color-text-foreground)',
    backgroundColor: 'var(--color-ui-background)',
  },
  '.cm-panels-bottom': {
    borderColor: 'var(--color-light-border)',
  },
  '.cm-panel.cm-panel [name="close"]': {
    bottom: 'auto',
    cursor: 'pointer',
    color: 'var(--color-icon)',
  },
  '.cm-panel.cm-panel [name="close"]:hover': {
    color: 'var(--color-active-icon)',
  },
  '.cm-panel.cm-panel [name="close"]:focus-visible': {
    outline: '2px solid var(--color-accent)',
    borderRadius: 'var(--radius-button)',
  },
  '.cm-button': {
    cursor: 'pointer',
    paddingBlock: ' var(--spacing-xs)',
    paddingInline: ' var(--spacing-s)',
    fontSize: 'var(--text-s)',
    color: 'var(--color-secondary-button-foreground)',
    backgroundImage: 'var(--gradient-button)',
    border: 'var(--border-button)',
    borderRadius: 'var(--radius-button)',
    boxShadow: 'var(--shadow-button)',
    outline: 0,
    textTransform: 'capitalize',
  },
  '.cm-button:hover': {
    backgroundImage: 'var(--gradient-button-hover)',
    border: 'var(--border-button-hover)',
  },
  '.cm-button:focus-visible': {
    outline: '2px solid var(--color-accent)',
    outlineOffset: '2px',
  },
  '.cm-panel.cm-search input[type="checkbox"]:focus-visible': {
    outline: '2px solid var(--color-accent)',
    outlineOffset: '2px',
    borderRadius: 'var(--radius-button)',
  },
});

// All available tags:
// https://lezer.codemirror.net/docs/ref/#highlight.tags
const squirrelsongHighlighting = syntaxHighlighting(
  HighlightStyle.define([
    {
      tag: tags.tagName,
      color: 'var(--color-code-keyword)',
      fontWeight: 'bold',
    },
    { tag: tags.angleBracket, color: 'var(--color-code-keyword)' },
    { tag: tags.keyword, color: 'var(--color-code-keyword)' },
    { tag: tags.comment, color: 'var(--color-code-comment)' },
    { tag: tags.variableName, color: 'var(--color-code-variable)' },
    { tag: tags.propertyName, color: 'var(--color-code-variable)' },
    { tag: tags.string, color: 'var(--color-code-string)' },
    { tag: tags.regexp, color: 'var(--color-code-string)' },
    { tag: tags.number, color: 'var(--color-code-value)' },
    { tag: tags.bool, color: 'var(--color-code-value)' },
    { tag: tags.null, color: 'var(--color-code-value)' },
    { tag: tags.operator, color: 'var(--color-code-operator)' },
    { tag: tags.punctuation, color: 'var(--color-code-punctuation)' },
  ])
);

const setHighlightRangesEffect = StateEffect.define<HighlightRange[]>();

const highlightRangesField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },
  update(decorations, transaction) {
    for (const effect of transaction.effects) {
      if (effect.is(setHighlightRangesEffect)) {
        const ranges = effect.value;
        const decorationRanges = ranges.map((range) =>
          Decoration.mark({ class: 'cm-searchMatch' }).range(
            range.from,
            range.to
          )
        );
        return Decoration.set(decorationRanges, true);
      }
    }
    return decorations.map(transaction.changes);
  },
  provide: (field) => EditorView.decorations.from(field),
});

export function Editor({
  id,
  label,
  value = '',
  language,
  editable = true,
  onChange,
  highlightRanges,
}: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => prev === false);
    return true;
  };

  const exitFullScreen = () => {
    if (isFullScreen) {
      setIsFullScreen(false);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (editorRef.current === null) {
      return;
    }

    const languageExtension = language
      ? languageExtensions[language]()
      : undefined;

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
        highlightRangesField,
        history(),
        lineNumbers(),
        highlightActiveLine(),
        highlightWhitespace(),
        search(),
        keymap.of([
          { key: 'Alt-Enter', run: toggleFullScreen },
          { key: 'Escape', run: exitFullScreen },
          { key: 'Mod-g', run: gotoLine },
        ]),
        keymap.of(historyKeymap),
        keymap.of(searchKeymap),
        keymap.of(defaultKeymap),
        EditorView.lineWrapping,
        EditorView.editable.of(editable),
        EditorView.contentAttributes.of({
          id: id ?? label.replaceAll(' ', '-').toLowerCase(),
          'aria-label': label,
        }),
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

    if (highlightRanges !== undefined) {
      view.dispatch({
        effects: setHighlightRangesEffect.of(highlightRanges),
      });
    }
  }, [highlightRanges]);

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
    <div
      ref={editorRef}
      className={clsx(
        'h-full min-h-0 bg-text-background',
        isFullScreen && 'fixed inset-0 z-1000',
        // eslint-disable-next-line better-tailwindcss/no-unknown-classes
        isFullScreen ? 'editor_fullscreen' : 'editor_in-page'
      )}
    />
  );
}
