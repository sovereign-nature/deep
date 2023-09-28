import { redirect } from '@sveltejs/kit';
/** @type {import('./$types').Actions} */

export const formSearch = {
  formSearch: async (event) => {
    const form = await event.request.formData();
    const search = form.get('search');
    const prefix = 'did:asset:deep:polkadot.asset-hub:u-8:';
    const regex = new RegExp(`^${prefix}`);
    const isMatch = regex.test(search);

    const assetAddress = isMatch ? search : `${prefix}${search}`;
    // const network = form.get('network');

    throw redirect(307, `/assets/${assetAddress}`);
  },
};
