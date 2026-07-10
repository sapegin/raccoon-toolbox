import { defineConfig } from 'oxfmt';
import oxfmt from 'oxlint-config-raccoon/oxfmt';

export default defineConfig({
  ...oxfmt,
  ignorePatterns: [
    'dist/',
    'dist-ssr/',
    'src-tauri/target/',
    'samples/',
    'src/tools.ts',
    'src/data/unicode-characters.ts',
  ],
});
