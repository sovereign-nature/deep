import { SNI_API_URL } from '@sni/constants';

import { stringToId } from '@sni/address-utils';
import axios from 'axios';

export function getLinkById(id: string) {
  return axios.get(`${SNI_API_URL}/${id}`);
}

export function getLinkByAddress(address: string) {
  const id = stringToId(address);
  return axios.get(`${SNI_API_URL}/${id}`);
}
