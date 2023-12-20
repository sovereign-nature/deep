import type { ServerLoadEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const formSearch = {
  formSearch: async (event: ServerLoadEvent) => {
    const form = await event.request.formData();
    const search = form.get('search') as string;
    const prefix = 'did:asset:deep:polkadot.asset-hub:13:';
    const regex = new RegExp(`^${prefix}`);
    const isMatch = regex.test(search);

    const assetAddress = isMatch ? search : `${prefix}${search}`;

    redirect(307, `/assets/${assetAddress}`);
  },
};
