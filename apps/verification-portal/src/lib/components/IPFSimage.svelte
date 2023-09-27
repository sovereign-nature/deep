<script lang="ts">
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import { SNI_IPFS_GATEWAY } from '@sni/constants';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';

  export let ipfsImageUrl: string;
  export let alt: string;

  let ipfsGateway = SNI_IPFS_GATEWAY;

  if (dev) {
    ipfsGateway = 'https://ipfs.io';
  }

  let isMounted = false;
  let isError = false;
  let isLoading = true;
  let errorMsg = `
    Oops! The NFT image couldn't make it to the habitat.🐾 </br></br>
    Please try again later.
  `;
  let imageUrl: string;
  $: imageUrl = getImageUrl(ipfsImageUrl);

  // Function to parse the IPFS URL and get the CID
  function getCID(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  // Function to generate the actual IPFS image URL
  function getImageUrl(ipfsUrl: string): string {
    if (!ipfsUrl) {
      isError = true;
      return '';
    }
    const cid = getCID(ipfsUrl);
    return `${ipfsGateway}/ipfs/${cid}`;
  }

  // Function to handle image loading errors
  function handleImageError() {
    isError = true;
    isLoading = false;
  }
  // Function to handle image load
  function handleImageLoad() {
    isLoading = false;
  }
  onMount(async () => {
    // Trigger the image load after the component is mounted
    if (!isError) {
      isMounted = true;
    }
  });
</script>

<div
  class="bg-gray-200 dark:bg-primary-800 dark:text-gray-200 w-56 h-56 md:h-64 md:w-64 rounded-lg mb-2 overflow-hidden text-center"
>
  <!-- Loading placeholder  -->
  {#if isLoading && !isError}
    <ImagePlaceholder className="w-56 h-56 md:h-64 md:w-64"></ImagePlaceholder>
  {:else if isError}
    <!-- Display error message when there's an error loading the image -->
    <p class="px-10 py-20 text-sm font-thin">{@html errorMsg}</p>
  {/if}
  {#if isMounted && !isError}
    <!-- Render the image when it's loaded -->
    <img
      src={imageUrl}
      {alt}
      class="object-cover w-56 h-56 md:h-64 md:w-64 rounded-lg fade-from-none"
      on:error={handleImageError}
      on:load={handleImageLoad}
    />
  {/if}
</div>
