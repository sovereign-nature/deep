import { dev } from '$app/environment';
import { getChainId } from '@sni/address-utils';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const formSearch = {
  formSearch: async (event: ServerLoadEvent) => {
    const form = await event.request.formData();
    const collection = form.get('collection') as string;

    const chainId = dev ? getChainId('sepolia') : getChainId('arbitrum');
    const tokenStandard = dev ? 'erc1155' : 'erc721';
    const contractAddress = dev
      ? '0x38de3f11ba85d75f28778c6f44a97d29ea910cf2'
      : '0x6cc7c9b2aa5fdcc044f9a51d9d083fd16aeb0a78';

    let prefix = '';
    switch (collection) {
      case 'sub0':
        prefix = 'did:asset:deep:polkadot.asset-hub:13:';
        break;
      case 'soundwaves':
        prefix = `did:asset:eip155:${chainId}.${tokenStandard}:${contractAddress}:`; //TODO: Should be unified across app
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
