<script lang="ts">
  import { onMount } from 'svelte';
  import { getAssetImageUrl } from '@sni/clients/images-client';

  import { Tooltip } from 'flowbite-svelte';

  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  import VerifiedIcon from '$lib/components/icons/VerifiedIcon.svelte';
  import HexagonGridIcon from '$lib/components/icons/HexagonGridIcon.svelte';
  import LL from '$lib/shared/i18n/i18n-svelte';

  export let url: string;
  export let alt: string;
  export let ecoLinked = false;
  export let multipass = false;
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
  $: imageUrl = isVideo ? url : getAssetImageUrl(url, size, size);

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
  <div class="absolute z-50 right-0 top-5 translate-x-1/2 flex flex-col gap-2">
    {#if ecoLinked}
      <VerifiedIcon
        className="text-white dark:text-primary-200  fill-primary-300 dark:fill-deep-green"
      />
      <Tooltip placement="left" class="text-center p-4 z-50 break-all"
        >{$LL.assets.infoEcoLinked()}</Tooltip
      >
    {/if}
    {#if multipass}
      <HexagonGridIcon
        className=" fill-primary-500 text-deep-green-500 h-[63px]"
      />
      <Tooltip placement="left" class="text-center p-4 z-50 break-all"
        >{$LL.assets.multipass.info()}</Tooltip
      >
    {/if}
  </div>

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
