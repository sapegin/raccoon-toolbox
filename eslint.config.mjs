import tamiaTypeScriptReact from 'eslint-config-tamia/typescript-react';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import jsxAccessibility from 'eslint-plugin-jsx-a11y';

export default [
  ...tamiaTypeScriptReact,
  jsxAccessibility.flatConfigs.strict,
  {
    ...eslintPluginBetterTailwindcss.configs.recommended,
    files: ['src/**/*.{ts,tsx}'],
    settings: {
      'better-tailwindcss': {
        // TODO: Move to src/styles/index.css
        entryPoint: 'src/styles.css',
      },
    },
  },
  {
    ignores: [
      'src-tauri/',
      'assets/',
      'dist/',
      'dist-ssr/',
      'src/data/unicode-characters.ts',
    ],
  },
];
