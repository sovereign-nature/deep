import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    watch: false,
    exclude: ['__checks__/*', ...configDefaults.exclude],
  },
});
