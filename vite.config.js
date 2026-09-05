import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for github pages. Usually '/repository-name/'. 
  // We'll use './' to make assets relative so it works on any subpath.
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        policy: resolve(import.meta.dirname, 'policy.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
        disclaimer: resolve(import.meta.dirname, 'disclaimer.html'),
      },
    },
  },
});
