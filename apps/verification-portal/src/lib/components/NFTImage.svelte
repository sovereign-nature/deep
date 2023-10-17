<script lang="ts">
  import { generateIPFSImageUrl, isIPFSUrl } from '$lib/utils';
  import { onMount } from 'svelte';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  import VerifiedIcon from '$lib/components/icons/VerifiedIcon.svelte';

  export let url: string;
  export let alt: string;
  export let verified = false;

  let isMounted = false;
  let isError = false;
  let isLoading = true;
  let errorMsg = `
    Oops! The NFT image couldn't make it to the habitat.🐾 \n
    Please try again later.
  `;

  let imageUrl: string | null;
  $: imageUrl = isIPFSUrl(url) ? generateIPFSImageUrl(url) : url;

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

<div class="relative">
  {#if verified}
    <VerifiedIcon
      className="text-white dark:text-primary-200 absolute z-50 right-0 top-5 translate-x-1/2 fill-primary-300 dark:fill-deep-green"
    />
  {/if}

  <div
    class="bg-gray-200 dark:bg-primary-800 dark:text-gray-200 w-56 h-56 md:h-64 md:w-64 rounded-lg mb-2 overflow-hidden text-center"
  >
    <!-- Loading placeholder  -->
    {#if isLoading && !isError}
      <ImagePlaceholder className="w-56 h-56 md:h-64 md:w-64"
      ></ImagePlaceholder>
    {:else if isError}
      <!-- Display error message when there's an error loading the image -->
      <p class="px-10 py-20 text-sm font-thin whitespace-pre-line">
        {errorMsg}
      </p>
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
</div>
