import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Prelaunch review origin. No final customer domain is approved yet; update
// `site` (and public/robots.txt) only when one is.
export default defineConfig({
  site: 'https://microscope-environmental-cleaning.vercel.app',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
