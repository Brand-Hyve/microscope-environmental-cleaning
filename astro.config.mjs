import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Update `site` to the final production domain before launch.
export default defineConfig({
  site: 'https://microscopeenvironmental.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
