import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    watch: false,
    setupFiles: ['./vitest.setup.ts'],
  },
});
