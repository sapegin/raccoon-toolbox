import { EditorView } from '@codemirror/view';

/** App styling for CodeMirror (editor chrome, search/go-to-line panels). */
export const codemirrorTheme = EditorView.theme({
  '&': {
    height: '100%',
  },
  '[data-editor-mode="in-page"] &': {
    border: 'var(--border-input)',
    borderRadius: 'var(--radius-input)',
    boxShadow: 'var(--shadow-input)',
  },
  '&.cm-focused': {
    outline: 0,
  },
  '[data-editor-mode="in-page"] &.cm-focused': {
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
    outline: 'var(--border-width-focus) solid var(--color-match-background)',
  },
  '.cm-panel': {
    color: 'var(--color-text-foreground)',
    backgroundColor: 'var(--color-ui-background)',
  },
  '.cm-panels-bottom': {
    borderColor: 'var(--color-light-border)',
  },
  '.cm-textfield': {
    boxSizing: 'border-box',
    height: 'calc(var(--spacing) * 6)',
    paddingBlock: 0,
    paddingInline: 'calc(var(--spacing) * 2)',
    fontSize: 'var(--text-sm)',
    lineHeight: 1,
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
  '&.cm-light .cm-textfield, &.cm-dark .cm-textfield': {
    color: 'var(--color-text-foreground)',
    backgroundColor: 'var(--color-text-background)',
    border: 'var(--border-input)',
  },
  // Keep in sync with @utility button / button-small in styles/components/button.css.
  '.cm-button': {
    display: 'inline-block',
    height: 'calc(var(--spacing) * 6)',
    paddingInline: 'calc(var(--spacing) * 2)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    lineHeight: 0.9,
    color: 'var(--color-secondary-button-foreground)',
    backgroundImage: 'var(--background-image-gradient-button)',
    textShadow: 'var(--text-shadow-secondary-button)',
    border: 'var(--border-button)',
    borderRadius: 'var(--radius-button)',
    boxShadow: 'var(--shadow-button)',
    outline: 0,
    textTransform: 'capitalize',
    userSelect: 'none',
    transition: 'all var(--duration-hover) var(--ease-hover)',
  },
  '.cm-button:hover, &.cm-light .cm-button:hover, &.cm-dark .cm-button:hover': {
    backgroundImage: 'var(--background-image-gradient-button-hover)',
    border: 'var(--border-button-hover)',
  },
  '.cm-button:active, &.cm-light .cm-button:active, &.cm-dark .cm-button:active':
    {
      translate: '0 1px',
      backgroundImage: 'var(--background-image-gradient-button)',
    },
  '.cm-button:focus-visible': {
    outline: 'var(--border-width-focus) solid var(--color-accent)',
    outlineOffset: 'var(--border-width-focus-offset)',
  },
  '&.cm-light .cm-button, &.cm-dark .cm-button': {
    color: 'var(--color-secondary-button-foreground)',
    backgroundImage: 'var(--background-image-gradient-button)',
    border: 'var(--border-button)',
  },
  '.cm-panel.cm-search input[type="checkbox"]': {
    width: 'calc(var(--spacing) * 4)',
    height: 'calc(var(--spacing) * 4)',
    margin: 0,
    verticalAlign: 'middle',
    accentColor: 'var(--color-accent)',
  },
  '.cm-panel.cm-search input[type="checkbox"]:focus-visible': {
    outline: 'var(--border-width-focus) solid var(--color-accent)',
    outlineOffset: 'var(--border-width-focus-offset)',
    borderRadius: 'var(--radius-input)',
  },
  '.cm-panel.cm-search [name="close"], .cm-panel.cm-gotoLine [name="close"]': {
    position: 'absolute',
    top: 'calc(var(--spacing) * 1)',
    right: 'calc(var(--spacing) * 1)',
    bottom: 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'calc(var(--spacing) * 6)',
    height: 'calc(var(--spacing) * 6)',
    padding: 0,
    margin: 0,
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--font-weight-bold)',
    lineHeight: 0,
    color: 'var(--color-icon)',
    backgroundColor: 'inherit',
    border: 'none',
    borderRadius: '50%',
    outline: 0,
  },
  '.cm-panel.cm-search [name="close"]:hover, .cm-panel.cm-gotoLine [name="close"]:hover':
    {
      color: 'var(--color-active-icon)',
    },
  '.cm-panel.cm-search [name="close"]:focus-visible, .cm-panel.cm-gotoLine [name="close"]:focus-visible':
    {
      outline: 'var(--border-width-focus) solid var(--color-accent)',
      outlineOffset: 0,
      borderRadius: '50%',
    },
});
