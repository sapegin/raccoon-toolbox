import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const host = process.env.TAURI_DEV_HOST ?? undefined;

// https://vite.dev/config/
export default defineConfig((env) => ({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 1024,
    rollupOptions:
      env.isSsrBuild || env.mode === 'ssr'
        ? {
            input: './src/entry-server.tsx',
            output: {
              dir: 'dist/server',
              entryFileNames: 'entry-server.js',
            },
          }
        : undefined,
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev`
  // or `tauri build`:
  //
  // 1. Prevent Vite from obscuring Rust errors
  clearScreen: false,
  // 2. Tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host ?? false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. Tell Vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
}));
