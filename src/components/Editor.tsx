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
import { useEffect, useRef, useState } from 'react';
import { Box } from '../../styled-system/jsx';

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
    border: 'var(--borders-input)',
    borderRadius: 'var(--radii-input)',
    boxShadow: 'var(--shadows-input)',
  },
  '&.cm-focused': {
    outline: 0,
  },
  '.editor_in-page &.cm-focused': {
    border: 'var(--borders-input-focus)',
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
  '.cm-searchMatch': {
    backgroundColor: 'var(--colors-secondary-match-background)',
  },
  '.cm-searchMatch-selected': {
    outline: '2px solid var(--colors-match-background)',
  },
  '.cm-textfield': {
    padding: ' var(--spacing-xs)',
    fontSize: 'var(--font-sizes-s)',
    color: 'var(--colors-text-foreground)',
    backgroundColor: 'var(--colors-text-background)',
    border: 'var(--borders-input)',
    borderRadius: 'var(--radii-input)',
    boxShadow: 'var(--shadows-input)',
    outline: 0,
  },
  '.cm-textfield:focus': {
    border: 'var(--borders-input-focus)',
  },
  '.cm-panel': {
    color: 'var(--colors-text-foreground)',
    backgroundColor: 'var(--colors-ui-background)',
  },
  '.cm-panels-bottom': {
    borderColor: 'var(--colors-light-border)',
  },
  '.cm-panel.cm-panel [name="close"]': {
    bottom: 'auto',
    cursor: 'pointer',
    color: 'var(--colors-icon)',
  },
  '.cm-panel.cm-panel [name="close"]:hover': {
    color: 'var(--colors-active-icon)',
  },
  '.cm-panel.cm-panel [name="close"]:focus-visible': {
    outline: '2px solid var(--colors-accent)',
    borderRadius: 'var(--radii-button)',
  },
  '.cm-button': {
    cursor: 'pointer',
    paddingBlock: ' var(--spacing-xs)',
    paddingInline: ' var(--spacing-s)',
    fontSize: 'var(--font-sizes-s)',
    color: 'var(--colors-secondary-button-foreground)',
    backgroundImage: 'var(--gradients-button)',
    border: 'var(--borders-button)',
    borderRadius: 'var(--radii-button)',
    boxShadow: 'var(--shadows-button)',
    outline: 0,
    textTransform: 'capitalize',
  },
  '.cm-button:hover': {
    backgroundImage: 'var(--gradients-button-hover)',
    border: 'var(--borders-button-hover)',
  },
  '.cm-button:focus-visible': {
    outline: '2px solid var(--colors-accent)',
    outlineOffset: '2px',
  },
  '.cm-panel.cm-search input[type="checkbox"]:focus-visible': {
    outline: '2px solid var(--colors-accent)',
    outlineOffset: '2px',
    borderRadius: 'var(--radii-button)',
  },
});

// All available tags:
// https://lezer.codemirror.net/docs/ref/#highlight.tags
const squirrelsongHighlighting = syntaxHighlighting(
  HighlightStyle.define([
    {
      tag: tags.tagName,
      color: 'var(--colors-code-keyword)',
      fontWeight: 'bold',
    },
    { tag: tags.angleBracket, color: 'var(--colors-code-keyword)' },
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
    <Box
      ref={editorRef}
      height="100%"
      minHeight={0}
      backgroundColor="textBackground"
      position={isFullScreen ? 'fixed' : undefined}
      inset={isFullScreen ? '0' : undefined}
      zIndex={isFullScreen ? '1000' : undefined}
      className={isFullScreen ? 'editor_fullscreen' : 'editor_in-page'}
    />
  );
}
