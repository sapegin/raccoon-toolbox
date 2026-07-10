import { defineConfig } from 'oxlint';
import typescriptReactTailwind from 'oxlint-config-raccoon/typescript-react-tailwind';

export default defineConfig({
  extends: [typescriptReactTailwind],
  options: { typeAware: true, typeCheck: true },
  // Worker and MessagePort postMessage APIs have no targetOrigin; this rule only applies to window.postMessage.
  rules: {
    'unicorn/require-post-message-target-origin': 'off',
  },
  settings: {
    tailwindcss: {
      entryPoint: 'src/styles.css',
    },
  },
  ignorePatterns: [
    'src-tauri/',
    'assets/',
    'dist/',
    'dist-ssr/',
    'src/data/unicode-characters.ts',
  ],
});
