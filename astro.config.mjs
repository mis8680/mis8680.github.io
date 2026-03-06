// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://insu.dev',
  output: 'static',
  outDir: './docs',
  build: {
    assets: '_assets'
  },
  vite: {
    build: {
      emptyOutDir: false
    },
    plugins: [tailwindcss()]
  }
});
