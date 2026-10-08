import { defineConfig } from 'vite';
export default defineConfig({
  root: 'src', publicDir: '../public', base: './',
  build: { outDir: '../dist', emptyOutDir: true },
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true }
});
