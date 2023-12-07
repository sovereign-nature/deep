import { SNI_API_URL } from '@sni/constants';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export function getEntity(
  collection: string,
  id: string,
  config: AxiosRequestConfig = {}
) {
  return axios.get(
    `${SNI_API_URL}/items/${collection}/${id}?fields=*,images.*,steward.*.*,statistics.name,statistics.value`,
    config
  );
}

export function getSteward(id: string, config: AxiosRequestConfig = {}) {
  return axios.get(`${SNI_API_URL}/items/stewards/${id}`, config);
}

export function getNewsBySteward(id: string, config: AxiosRequestConfig = {}) {
  return axios.get(`${SNI_API_URL}/items/stewards/${id}?fields=news.*`, config);
}
