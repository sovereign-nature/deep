<script lang="ts">
  import { dev } from '$app/environment';
  import { SNI_IPFS_GATEWAY } from '@sni/constants';

  export let ipfsImageUrl: string;
  export let alt: string;

  let ipfsGateway = SNI_IPFS_GATEWAY;

  if (dev) {
    ipfsGateway = 'https://ipfs.io';
  }

  // Function to parse the IPFS URL and get the CID
  function getCID(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  // Function to generate the actual IPFS image URL
  function getImageUrl(ipfsUrl: string): string {
    if (!ipfsUrl) {
      // Return a placeholder image URL
      isError = true;
      return '';
    }
    const cid = getCID(ipfsUrl);
    return `${ipfsGateway}/ipfs/${cid}`;
  }

  // Function to handle image loading errors
  function handleImageError() {
    isError = true;
  }

  let isError = false;
  let imageUrl: string;
  $: imageUrl = getImageUrl(ipfsImageUrl);
  const errorMsg =
    'Sorry, the NFT image failed to load. Please try again later';
</script>

<div
  class="bg-gray-200 w-56 h-56 md:h-64 md:w-64 rounded-lg mb-2 overflow-hidden text-center"
>
  {#if !isError}
    <img
      src={imageUrl}
      class="object-cover w-56 h-56 md:h-64 md:w-64"
      {alt}
      on:error={handleImageError}
    />
  {:else}
    <p class="px-4 py-24">{errorMsg}</p>
  {/if}
</div>
