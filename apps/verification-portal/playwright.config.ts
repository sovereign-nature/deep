import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'pnpm run build && pnpm run preview',
    port: 4173,
  },
  testDir: 'tests',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  outputDir: 'tests/test-results',
};
if (config.use) {
  config.use.baseURL =
    process.env.ENVIRONMENT_URL || 'https://deep-real.vercel.app';
}

export default config;
