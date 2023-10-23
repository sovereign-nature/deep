import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: 'sovereign-nature-initiative',
        project: 'real',
      },
    }),
    sveltekit(),
    SvelteKitPWA(),
  ],
  assetsInclude: ['**/*.glb'],
});
