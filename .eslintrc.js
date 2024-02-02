module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'plugin:svelte/prettier',
    'plugin:boundaries/recommended',
    'prettier',
    'turbo',
  ],
  rules: {
    'import/order': 'warn',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'boundaries', 'import'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte'],
  },
  env: {
    browser: true,
    es2017: true,
    mocha: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  settings: {
    //TODO: seems no effect on linting
    'boundaries/elements': [
      {
        type: 'packages',
        pattern: 'packages/*',
      },
    ],
  },
};
