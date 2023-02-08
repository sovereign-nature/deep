import { STORAGE_API_URL } from '@sni/constants';
import axios from 'axios';
import { ethers } from 'hardhat';

// axios.defaults.headers.common[
//   'Authorization'
// ] = `Bearer ${process.env.NFT_STORAGE_API_KEY}`;

export async function pinData(data: object | string) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NFT_STORAGE_API_KEY}`,
    },
  };

  const res = await axios.post(`${STORAGE_API_URL}/upload`, data, config);

  if (res.status !== 200) {
    console.error('pinning failed');
  }

  return res;
}

export function makeIpfsUrl(cid: string) {
  return `ipfs://${cid}`;
}

export const moonbaseProvider = new ethers.providers.StaticJsonRpcProvider(
  'https://rpc.api.moonbase.moonbeam.network',
  {
    chainId: 1287,
    name: 'moonbase-alphanet',
  }
);
