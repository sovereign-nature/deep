// import { sentrySvelteKit } from '@sentry/sveltekit'; //TODO: Return Sentry after sourcemaps upload is fixed
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { visualizer } from 'rollup-plugin-visualizer';

import { defineConfig, type PluginOption } from 'vite';

const isVisualizeBuild = () => process.env.VITE_VISUALIZE_BUILD === 'true';

export default defineConfig({
  plugins: [
    // sentrySvelteKit({
    //   sourceMapsUploadOptions: {
    //     org: 'sovereign-nature-initiative',
    //     project: 'real',
    //   },
    // }),
    sveltekit(),
    SvelteKitPWA(),
    // Visualize bundle size in stats.html files
    isVisualizeBuild() &&
      (visualizer({
        emitFile: true,
        filename: 'stats.html',
      }) as PluginOption),
  ],

  build: {
    rollupOptions: {
      treeshake: 'smallest',
    },
  },
  assetsInclude: ['**/*.glb'],
});
