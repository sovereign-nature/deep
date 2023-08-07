module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  bracketSameLine: true,
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
  ],
};
