<script lang="ts">
  import { onMount } from 'svelte';
  import { SNI_API_URL } from '@sni/constants';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';

  export let assetID: string;
  export let altText: string;
  export let className = '';
  export let classNameImage = '';

  const API_BASE_URL = SNI_API_URL;
  const imageRequestConfig = '?format=auto&withoutEnlargement&quality=80';

  $: imageLoaded = false;
  let isMounted = false;

  // Function to handle image load
  function handleImageLoad() {
    imageLoaded = true;
  }

  onMount(async () => {
    isMounted = true;
  });
</script>

<div
  class="{className} image-container object-cover"
  class:loading={!imageLoaded}
>
  <!-- Skeleton loading card -->
  {#if !imageLoaded}
    <div class="skeleton-card"></div>
    <ImagePlaceholder></ImagePlaceholder>
  {/if}
  {#if isMounted}
    <!-- Render the image when it's loaded -->
    <img
      class="{classNameImage} fade-from-none w-full"
      srcset="{`${API_BASE_URL}/assets/${assetID}${imageRequestConfig}&width=400 400w,`}
        {`${API_BASE_URL}/assets/${assetID}${imageRequestConfig}&width=600 600w,`}
        {`${API_BASE_URL}/assets/${assetID}${imageRequestConfig}&width=800 800w,`}"
      sizes="(max-width: 600px) 400px, (max-width: 1024px) 800px, 1000px"
      src={`${API_BASE_URL}/assets/${assetID}${imageRequestConfig}&width=1000`}
      alt={altText}
      on:load={handleImageLoad}
    />
  {/if}
</div>

<style>
  .image-container {
    width: inherit;
    min-height: 5rem;
    height: 100%;
    overflow: hidden;
    position: relative;
    transition: min-height 0.15s ease-in;
  }
  .image-container.loading {
    min-height: 15rem;
  }
</style>
