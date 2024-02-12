import {
  OpenSeaResponse,
  PolkadotResponse,
  getNftAsset,
  getHotelHideawayAsset,
} from '@sni/clients/assets-client';
import { DeepAsset } from '@sni/types';
import { getChainName, parseAddress } from '@sni/address-utils';
import {
  directusFormatter,
  openSeaFormatter,
  polkadotFormatter,
} from './formatters';

//TODO: Move to address-utils
export function getNetworkId(chainNamespace: string, chainId: string): string {
  switch (chainNamespace) {
    case 'eip155':
      return getChainName(parseInt(chainId));
    case 'deep':
      return chainId;
    default:
      throw new Error(`Unknown namespace: ${chainNamespace}`);
  }
}

//TODO: Should it be in client?
export async function getAsset(
  networkId: string,
  assetId: string,
  tokenId: number,
  apiKey?: string
): Promise<DeepAsset> {
  switch (networkId) {
    case 'polkadot':
    case 'kusama':
      return polkadotFormatter(
        (await getNftAsset(networkId, assetId, tokenId)) as PolkadotResponse
      );
    case 'sepolia':
    case 'arbitrum':
      return openSeaFormatter(
        (await getNftAsset(
          networkId,
          assetId,
          tokenId,
          apiKey
        )) as OpenSeaResponse
      );
    case 'hotel-hideaway':
      return directusFormatter(await getHotelHideawayAsset(assetId));
    default:
      throw new Error(`Unknown networkId: ${networkId}`);
  }
}

//TODO: Move to address-utils
export function parseDID(did: string) {
  const { chain, asset } = parseAddress(did);
  const networkId = getNetworkId(chain.namespace, chain.reference);
  const assetId = asset.reference;
  const tokenId = asset.identifier;

  return { networkId, assetId, tokenId };
}
