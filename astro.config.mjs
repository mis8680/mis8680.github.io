// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mis8680.github.io',
  output: 'static',
  outDir: './docs',
  build: {
    assets: '_assets'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
