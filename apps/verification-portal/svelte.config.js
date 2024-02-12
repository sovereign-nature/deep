import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  vitePlugin: {
    inspector: true,
  },

  kit: {
    adapter: adapter(),
    alias: {
      $i18n: 'src/i18n',
    },
  },
};

export default config;
