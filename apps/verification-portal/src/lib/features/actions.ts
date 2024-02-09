import { getChainId } from '@sni/address-utils';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const formSearch = {
  formSearch: async (event: ServerLoadEvent) => {
    const form = await event.request.formData();
    const collection = form.get('collection') as string;

    const chainId = getChainId('arbitrum');
    const tokenStandard = 'erc721';
    const contractAddress = '0x6cc7c9b2aa5fdcc044f9a51d9d083fd16aeb0a78';

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

export const shareFile = async (
  fileUrl: string,
  name: string,
  message: string
) => {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const fileData = await response.blob();
    if (
      navigator.share &&
      navigator.canShare({ files: [new File([], 'test')] })
    ) {
      const fileWithProperties = new File([fileData], name, {
        lastModified: Date.now(),
        type: fileData.type,
      });
      try {
        await navigator.share({
          files: [fileWithProperties],
          text: message,
        });
      } catch (err) {
        console.error('Error sharing the file:', err);
        downloadFile(fileData, name);
      }
    } else {
      downloadFile(fileData, name);
    }
  } catch (err) {
    console.error('Error fetching the file:', err); //TODO: Add callback for retry and UX error handling
  }
};

export const downloadFile = async (fileData: Blob, name: string) => {
  const url = URL.createObjectURL(fileData);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
};
