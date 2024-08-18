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
    const email = form.get('email') as string;

    const body: { token: string; address: string; email?: string } = {
      token: claim,
      address: address,
    };

    if (email) {
      body.email = email;
    }

    //TODO: Add server side logging

    try {
      const fetchResponse = await fetch(`${deepApiUrl}/claims`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(body),
      });

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
