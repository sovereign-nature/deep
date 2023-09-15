import { HoudiniClient } from '$houdini';

export const polkadotGqlClient = new HoudiniClient({
  url: 'https://squid.subsquid.io/speck/v/v3/graphql',
});

export const kusamaGqlClient = new HoudiniClient({
  url: 'https://squid.subsquid.io/stick/graphql',
});
