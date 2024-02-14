//TODO: Merge with the other clients?
//TODO: Add cover with tests

import { stringToId } from '@sni/address-utils';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { directusUrl } from './config';

const API_URL = `${directusUrl}/items/links`;

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
