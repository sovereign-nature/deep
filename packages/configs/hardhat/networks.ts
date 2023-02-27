export const moonbaseConfig = {
  url: 'https://rpc.api.moonbase.moonbeam.network',
  chainId: 1287, // 0x507 in hex,
  accounts:
    process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
};
