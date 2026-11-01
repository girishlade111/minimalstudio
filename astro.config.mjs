import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // Project site on GitHub Pages: https://girishlade111.github.io/minimalstudio/
  site: "https://girishlade111.github.io",
  base: process.env.BASE_PATH || "/minimalstudio/",
  integrations: [ sitemap()]
});