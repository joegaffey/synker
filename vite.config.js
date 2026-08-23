import { defineConfig } from 'vite';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    {
      name: 'sw-build-hash',
      closeBundle() {
        const swPath = resolve('dist', 'sw.js');
        const content = readFileSync(swPath, 'utf-8');
        const hash = Date.now().toString(36);
        writeFileSync(swPath, content.replaceAll('__BUILD_HASH__', hash));
      },
    },
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
