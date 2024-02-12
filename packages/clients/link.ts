import { SNI_DIRECTUS_URL } from '@sni/constants';

import { stringToId } from '@sni/address-utils';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

const API_URL = `${SNI_DIRECTUS_URL}/items/links`;

export function getLinkById(id: string, config: AxiosRequestConfig = {}) {
  return axios.get(`${API_URL}/${id}`, config);
}

export function getLinkByAddress(
  address: string,
  config: AxiosRequestConfig = {}
) {
  const id = stringToId(address);
  return axios.get(`${API_URL}/${id}`, config);
}
