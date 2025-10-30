import tamiaTypeScriptReact from 'eslint-config-tamia/typescript-react';
import eslintPluginAstro from 'eslint-plugin-astro';
import jsxAccessibility from 'eslint-plugin-jsx-a11y';

export default [
  ...tamiaTypeScriptReact,
  ...eslintPluginAstro.configs.recommended,
  jsxAccessibility.flatConfigs.strict,
  {
    ignores: ['src-tauri/', 'assets/', 'dist/', 'dist-ssr/'],
  },
];
