import { SNI_API_URL } from '@sni/constants';
import axios, { AxiosRequestConfig } from 'axios';

export function getEntity(
  collection: string,
  id: string,
  config: AxiosRequestConfig = {}
) {
  return axios.get(`${SNI_API_URL}/${collection}/${id}`, config);
}

export function getSteward(id: string, config: AxiosRequestConfig = {}) {
  return axios.get(`${SNI_API_URL}/stewards/${id}`, config);
}
