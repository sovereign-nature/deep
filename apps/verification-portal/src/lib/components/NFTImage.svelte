<script lang="ts">
  import { onMount } from 'svelte';
  import { getAssetImageUrl } from '@sni/clients/images-client';

  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  import VerifiedIcon from '$lib/components/icons/VerifiedIcon.svelte';
  import LL from '$lib/shared/i18n/i18n-svelte';

  export let url: string;
  export let alt: string;
  export let verified = false;
  export let size = 300;
  export let imgClass =
    'object-cover w-full h-full rounded-xl sm:rounded-lg fade-from-none';
  export let containerClass =
    'w-52 h-52 md:h-64 md:w-64 rounded-xl sm:rounded-lg  mb-2 overflow-hidden text-center bg-gray-400 dark:bg-deep-green';
  export let imgPlaceholderClass = 'w-56 h-56 md:h-64 md:w-64 absolute';

  let isMounted = false;
  let isError = false;
  let isLoading = true;
  let errorMsg = $LL.errors.image();

  $: isVideo = url?.endsWith('.mp4');
  $: imageUrl = isVideo ? url : getAssetImageUrl(url, size);

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
      {#if isVideo}
        <video
          src={imageUrl}
          class={imgClass}
          on:error={handleImageError}
          on:canplay={handleImageLoad}
          playsinline
          autoplay
          loop
          muted
        />
      {:else}
        <img
          src={imageUrl}
          {alt}
          class={imgClass}
          on:error={handleImageError}
          on:load={handleImageLoad}
        />
      {/if}
    {/if}
  </div>
</div>
