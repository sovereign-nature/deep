import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

const bindings: { [key: string]: string } = {};

if (process.env['OPEN_SEA_API_KEY']) {
  bindings['OPEN_SEA_API_KEY'] = process.env['OPEN_SEA_API_KEY'];
}

if (process.env['ALCHEMY_API_KEY']) {
  bindings['ALCHEMY_API_KEY'] = process.env['ALCHEMY_API_KEY'];
}

export default defineWorkersConfig({
  test: {
    watch: false,
    poolOptions: {
      workers: {
        wrangler: { configPath: './wrangler.toml' },
        miniflare: {
          bindings,
        },
      },
    },
  },
});
