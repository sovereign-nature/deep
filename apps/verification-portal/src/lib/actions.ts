import type { ServerLoadEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const formSearch = {
  formSearch: async (event: ServerLoadEvent) => {
    const form = await event.request.formData();
    const collection = form.get('collection') as string;

    let prefix = '';
    switch (collection) {
      case 'sub0':
        prefix = 'did:asset:deep:polkadot.asset-hub:13:';
        break;
      case 'soundwaves':
        prefix =
          'did:asset:eip155:11155111.erc1155:0x38de3f11ba85d75f28778c6f44a97d29ea910cf2:';
        break;
      default:
        throw new Error('Invalid collection id');
    }

    console.log('collection', collection);
    console.log('prefix', prefix);

    const search = form.get('search') as string;
    const regex = new RegExp(`^${prefix}`);
    const isMatch = regex.test(search);

    const assetAddress = isMatch ? search : `${prefix}${search}`;

    redirect(307, `/assets/${assetAddress}`);
  },
};
