import { defineConfig } from 'oxlint';
import typescriptReactTailwind from 'oxlint-config-raccoon/typescript-react-tailwind';

export default defineConfig({
  extends: [typescriptReactTailwind],
  options: { typeAware: true, typeCheck: true },
  settings: {
    tailwindcss: {
      entryPoint: 'src/styles.css',
    },
  },
  rules: {
    'jsx-a11y/prefer-tag-over-role': 'off',
    'promise/prefer-await-to-callbacks': 'off',
    'promise/prefer-await-to-then': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/button-has-type': 'off',
    'react/no-danger': 'off',
    'tailwindcss/no-conflicting-classes': 'off',
    'tailwindcss/no-unknown-classes': 'off',
    'typescript/no-misused-spread': 'off',
    'typescript/no-useless-default-assignment': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/prefer-global-this': 'off',
  },
  ignorePatterns: [
    'src-tauri/',
    'assets/',
    'dist/',
    'dist-ssr/',
    'src/data/unicode-characters.ts',
  ],
});
