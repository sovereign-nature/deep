<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let modelUrl: string;

  onMount(async () => {
    if (browser) {
      await import('@google/model-viewer');
    }
  });
</script>

<model-viewer
  alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
  src={modelUrl}
  environment-image="https://modelviewer.dev/shared-assets/environments/moon_1k.hdr"
  ar
  shadow-intensity="1"
  auto-rotate
  camera-controls
  disable-zoom
  touch-action="pan-y"
  class="w-full h-full"
/>
