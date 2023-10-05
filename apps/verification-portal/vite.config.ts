import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
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
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    watch: false,
  },
  assetsInclude: ['**/*.glb'],
});
