import type { ServerLoadEvent } from '@sveltejs/kit';
import { redirect, fail } from '@sveltejs/kit';
import { deepApiUrl } from '@sni/clients/config';

export const formActions = {
  formSearch: async (event: ServerLoadEvent) => {
    const form = await event.request.formData();
    const collection = form.get('collection') as string;
    const prefix = `${collection}:`;
    const search = form.get('search') as string;
    const regex = new RegExp(`^${prefix}`);
    const isMatch = regex.test(search);
    const assetAddress = isMatch ? search : `${prefix}${search}`;
    redirect(307, `/assets/${assetAddress}`);
  },
  claim: async (event: ServerLoadEvent) => {
    const form = await event.request.formData();
    const claim = form.get('claim') as string;
    const address = form.get('address') as string;
    const setHeaders = new Headers();
    setHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      token: claim,
      address: address,
    });
    const requestOptions = {
      method: 'POST',
      headers: setHeaders,
      body: raw,
    };
    try {
      const fetchResponse = await fetch(`${deepApiUrl}/claims`, requestOptions);
      if (fetchResponse.status === 500) {
        return fail(fetchResponse.status, { message: 'Internal server error' });
      }
      let data;
      try {
        data = await fetchResponse.json();
      } catch (error) {
        return fail(500, { message: 'Unable to parse response' });
      }
      if (!fetchResponse.ok) {
        return fail(fetchResponse.status, data.message);
      }
      return data;
    } catch (error) {
      return fail(400, { message: error });
    }
  },
};
