import { SNI_API_URL } from '@sni/constants';

import { stringToId } from '@sni/address-utils';
import axios from 'axios';

const API_URL = `${SNI_API_URL}/items/links`;

export function getLinkById(id: string) {
  return axios.get(`${API_URL}/${id}`);
}

export function getLinkByAddress(address: string) {
  const id = stringToId(address);
  return axios.get(`${API_URL}/${id}`);
}
