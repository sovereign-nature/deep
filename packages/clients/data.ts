import { SNI_DIRECTUS_URL } from '@sni/constants';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios'; //TODO: Replace axios with fetch

export function getEntity(
  collection: string,
  id: string,
  config: AxiosRequestConfig = {}
) {
  return axios.get(
    `${SNI_DIRECTUS_URL}/items/${collection}/${id}?fields=*,images.*,sound.*,steward.*.*,statistics.name,statistics.value`,
    config
  );
}

export function getSteward(id: string, config: AxiosRequestConfig = {}) {
  return axios.get(`${SNI_DIRECTUS_URL}/items/stewards/${id}`, config);
}

export function getNewsBySteward(
  id: string,
  count: string | number, // set -1 to get all
  config: AxiosRequestConfig = {}
) {
  return axios.get(
    `${SNI_DIRECTUS_URL}/items/stewards/${id}?deep[news][_filter][status][_eq]=published&deep[news][_limit]=${count}&fields=news.*`,
    config
  );
}
