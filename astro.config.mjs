import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  base: '/an',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
