// import { defineConfig } from 'vitest/config';
// import tsconfigPaths from 'vite-tsconfig-paths';
// import path from 'node:path';
import {
  defineWorkersProject,
  // readD1Migrations,
} from '@cloudflare/vitest-pool-workers/config';

// // @ts-expect-error - tsconfigPaths is not correctly typed
export default defineWorkersProject(async () => {
  // Read all migrations in the `migrations` directory
  // const migrationsPath = path.join(__dirname, 'migrations');
  // const migrations = await readD1Migrations(migrationsPath);

  return {
    test: {
      // setupFiles: ['./test/apply-migrations.ts'],
      poolOptions: {
        workers: {
          wrangler: {
            configPath: './wrangler.toml',
          },
        },
      },
    },
    // plugins: [tsconfigPaths()],
  };
});

// export default defineConfig({
//   test: {
//     watch: false,
//   },

//   plugins: [tsconfigPaths()],
// });
