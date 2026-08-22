import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // GitHub user page at https://shaquibbai.github.io/
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
