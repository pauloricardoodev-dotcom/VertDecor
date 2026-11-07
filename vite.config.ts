import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
      },
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1100, // chunk do Three.js é carregado sob demanda
  },
});
