import { UniqueNetwork } from '@sni/types';
import Sdk from '@unique-nft/sdk';
import { Sr25519Account } from '@unique-nft/utils/sr25519';
import { logger } from './logger';

export function getUniqueAccount(mnemonic: string) {
  return Sr25519Account.fromUri(mnemonic);
}

//TODO: Remove mnemonic from the function signature, add account as a parameter
export function getUniqueSdk(mnemonic: string, network: UniqueNetwork) {
  const account = Sr25519Account.fromUri(mnemonic);

  logger.info(
    `Using account ${account.address} on network ${network} for Unique SDK`
  );

  const sdk = new Sdk({
    baseUrl: `https://rest.unique.network/${network}/v1`,
    account,
    axiosConfig: { adapter: 'fetch' },
  });

  return sdk;
}
