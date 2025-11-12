import tamiaTypeScriptReact from 'eslint-config-tamia/typescript-react';
import jsxAccessibility from 'eslint-plugin-jsx-a11y';

export default [
  ...tamiaTypeScriptReact,
  jsxAccessibility.flatConfigs.strict,
  {
    ignores: [
      'src-tauri/',
      'assets/',
      'styled-system/',
      'dist/',
      'dist-ssr/',
      'src/data/unicode-characters.ts',
    ],
  },
];
