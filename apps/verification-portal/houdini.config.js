/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
  watchSchema: {
    url: 'https://squid.subsquid.io/speck/v/v3/graphql',
  },
  plugins: {
    'houdini-svelte': {},
  },
};

export default config;
