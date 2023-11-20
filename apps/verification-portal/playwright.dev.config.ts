import type { PlaywrightTestConfig } from '@playwright/test';
const devConfig: PlaywrightTestConfig = {
  webServer: {
    reuseExistingServer: true,
    command: 'pnpm run dev',
    port: 5173,
    timeout: 120 * 1000,
  },
  testDir: 'tests',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  outputDir: 'tests/test-results',
};

if (devConfig.use) {
  devConfig.use.baseURL =
    process.env.ENVIRONMENT_URL || 'https://deep-real.vercel.app';
}

export default devConfig;
