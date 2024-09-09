import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { visualizer } from 'rollup-plugin-visualizer';
// import { splitVendorChunkPlugin } from 'vite';
import { defineConfig, type PluginOption } from 'vite';

const isVisualizeBuild = () => process.env.VITE_VISUALIZE_BUILD === 'true';

export default defineConfig({
  plugins: [
    // splitVendorChunkPlugin(),
    sentrySvelteKit({
      autoUploadSourceMaps: false, //TODO: Fix sourcemap upload
      sourceMapsUploadOptions: {
        org: 'sovereign-nature-initiative',
        project: 'real',
      },
    }),
    sveltekit(),
    SvelteKitPWA({ workbox: { maximumFileSizeToCacheInBytes: 3000000 } }),
    // Visualize bundle size in stats.html files
    isVisualizeBuild() &&
      (visualizer({
        emitFile: true,
        filename: 'stats.html',
      }) as PluginOption),
  ],

  assetsInclude: ['**/*.glb'],
});
