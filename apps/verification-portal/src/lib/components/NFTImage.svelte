<script lang="ts">
  import { onMount } from 'svelte';
  import {
    generateAssetURL,
    generateIPFSImageUrl,
    generateCachedUrl,
    isIPFSUrl,
  } from '$lib/shared/utils';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  import VerifiedIcon from '$lib/components/icons/VerifiedIcon.svelte';
  import LL from '$lib/shared/i18n/i18n-svelte';

  export let url: string;
  export let alt: string;
  export let verified = false;
  export let size = 300;
  export let imgClass = 'object-cover w-full h-full rounded-lg fade-from-none';
  export let containerClass =
    'w-56 h-56 md:h-64 md:w-64 rounded-lg mb-2 overflow-hidden text-center bg-gray-400 dark:bg-deep-green';
  export let imgPlaceholderClass = 'w-56 h-56 md:h-64 md:w-64';

  let isMounted = false;
  let isError = false;
  let isLoading = true;
  let errorMsg = $LL.errors.image();

  let imageUrl: string;
  //TODO: getAssetUrl from clients
  $: imageUrl = generateCachedUrl(
    isIPFSUrl(url)
      ? generateIPFSImageUrl(url)
      : isUrl(url)
        ? url
        : generateAssetURL(url, size)
  );

  //check if id or url
  function isUrl(url: string): boolean {
    if (!url) {
      return false;
    }
    return (
      url.toLowerCase().startsWith('https://') ||
      url.toLowerCase().startsWith('http://')
    );
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

<div class="relative">
  {#if verified}
    <VerifiedIcon
      className="text-white dark:text-primary-200 absolute z-50 right-0 top-5 translate-x-1/2 fill-primary-300 dark:fill-deep-green"
    />
  {/if}

  <div class={containerClass}>
    <!-- Loading placeholder  -->
    {#if isLoading && !isError}
      <ImagePlaceholder className={imgPlaceholderClass}></ImagePlaceholder>
    {:else if isError}
      <!-- Display error message when there's an error loading the image -->
      <p class="px-10 py-20 text-sm font-thin whitespace-pre-line">
        {errorMsg}
      </p>
    {/if}
    {#if isMounted && !isError}
      <!-- Render the image when it's loaded -->
      <img
        loading="lazy"
        src={imageUrl}
        {alt}
        class={imgClass}
        on:error={handleImageError}
        on:load={handleImageLoad}
      />
    {/if}
  </div>
</div>
