import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { defineWorkersProject } from '@cloudflare/vitest-pool-workers/config';

// export default defineWorkersProject(async () => {
//   return {
//     test: {
//       poolOptions: {
//         workers: {
//           wrangler: {
//             configPath: './wrangler.toml',
//           },
//         },
//       },
//     },
//     plugins: [tsconfigPaths()],
//   };
// });

export default defineConfig({
  test: {
    watch: false,
  },

  plugins: [tsconfigPaths()],
});
