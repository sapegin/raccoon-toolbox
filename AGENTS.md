# AGENTS.md

## Creating new tools

- Register a tool at `tools.json`.
- Run `npm run generate:tools` to regenerate the code.
- Use established UI and code patterns from existing tools.

## Design tokens

- Do not hardcode spacing or font sizes when design tokens exist.
- Use Tailwind spacing (`--spacing(2)`, etc.) and theme font sizes (`var(--text-sm)`, `var(--text-lg)`, `var(--text-root)`, etc.) from `src/theme.css` and the Tailwind theme.
- CodeMirror: put all `EditorView.theme()` styling in `src/components/codemirrorTheme.ts` (use `calc(var(--spacing) * n)` and `var(--text-*)`, not `--spacing(n)`).
