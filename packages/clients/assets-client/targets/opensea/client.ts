import { DeepAsset } from '../../types';
import openSeaFormatter from './formatter';
import { OpenSeaCollectionResponse, OpenSeaResponse } from './types';

export async function getOpenSeaAsset(
  contractAddress: string,
  tokenId: number,
  network: string,
  apiKey?: string
): Promise<DeepAsset> {
  const testnetPrefix = network === 'sepolia' ? 'testnets-' : '';

  const apiURL = `https://${testnetPrefix}api.opensea.io/api/v2/chain/${network}`;

  const headers = {
    'X-API-KEY': apiKey ? apiKey : '',
    Accept: 'application/json',
  };

  const nftRes = await fetch(
    `${apiURL}/contract/${contractAddress}/nfts/${tokenId}`,
    { headers }
  );

  const nftData: OpenSeaResponse = await nftRes.json();

  const collectionRes = await fetch(`${apiURL}/contract/${contractAddress}`, {
    headers,
  });

  const collectionData: OpenSeaCollectionResponse = await collectionRes.json();

  nftData.collection = collectionData;

  return openSeaFormatter(nftData);
}
