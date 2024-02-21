//TODO: Rename to data-client, cover with tests

import type { AxiosRequestConfig } from 'axios';
import axios from 'axios'; //TODO: Replace axios with fetch
import { directusUrl } from './config';

export function getEntity(
  collection: string,
  id: string,
  config: AxiosRequestConfig = {}
) {
  return axios.get(
    `${directusUrl}/items/${collection}/${id}?fields=*,images.*,sound.*,steward.*.*,statistics.name,statistics.value`,
    config
  );
}

export function getSteward(id: string, config: AxiosRequestConfig = {}) {
  return axios.get(`${directusUrl}/items/stewards/${id}`, config);
}

export function getNewsBySteward(
  id: string,
  count: string | number, // set -1 to get all
  config: AxiosRequestConfig = {},
  draft: boolean = false
) {
  const filterByStatus = !draft ? `[status][_eq]=published&` : '';
  return axios.get(
    `${directusUrl}/items/stewards/${id}?deep[news][_filter]${filterByStatus}&deep[news][_limit]=${count}&fields=news.*`,
    config
  );
}
