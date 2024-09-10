import { UniqueNetwork } from '@sni/types';
import Sdk from '@unique-nft/sdk';
import { Sr25519Account } from '@unique-nft/utils/sr25519';

export function getUniqueSdk(mnemonic: string, network: UniqueNetwork) {
  const account = Sr25519Account.fromUri(mnemonic);

  const sdk = new Sdk({
    baseUrl: `https://rest.unique.network/${network}/v1`,
    account,
    axiosConfig: { adapter: 'fetch' },
  });

  return sdk;
}
