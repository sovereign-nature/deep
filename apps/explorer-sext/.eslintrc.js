module.exports = {
  extends: [
    'sni',
    'sni-vue',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'turbo',
  ],
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off', // TODO: remove this when we have a single root element
      },
    },
  ],
};
