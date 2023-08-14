/** @type {import("prettier").Options} */
const config = {
  singleQuote: true,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-organize-imports'],
  overrides: [
    {
      files: '*.sol',
      options: {
        printWidth: 120,
        tabWidth: 4,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: true,
        explicitTypes: 'always',
      },
    },
    {
      files: '*.template.yaml',
      options: {
        bracketSpacing: false,
      },
    },
    {
      files: '*.svelte',
      options: { parser: 'svelte', plugins: ['prettier-plugin-svelte'] },
    },
  ],
};

module.exports = config;
