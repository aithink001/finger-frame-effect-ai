import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/finger-frame-effect-ai/',
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        zh: resolve(import.meta.dirname, 'zh/index.html'),
        ko: resolve(import.meta.dirname, 'ko/index.html'),
        ja: resolve(import.meta.dirname, 'ja/index.html'),
        es: resolve(import.meta.dirname, 'es/index.html'),
      },
    },
  },
});
