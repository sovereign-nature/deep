import axios from 'axios';
import { STORAGE_API_URL } from '../mint-lions';

axios.defaults.headers.common[
  'Authorization'
] = `Bearer ${process.env.NFT_STORAGE_API_KEY}`;

export async function pinData(data: object | string) {
  const res = await axios.post(`${STORAGE_API_URL}/upload`, data);

  if (res.status !== 200) {
    console.error('pinning failed');
  }

  return res;
}

export function makeIpfsUrl(cid: string) {
  return `ipfs://${cid}`;
}
