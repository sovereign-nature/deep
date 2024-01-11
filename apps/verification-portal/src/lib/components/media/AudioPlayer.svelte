<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Howl } from 'howler';
  import { Howl as HowlType } from 'howler';
  import { generateMediaURL } from '$lib/utils';
  import Play from '$lib/components/icons/Play.svelte';
  import Pause from '$lib/components/icons/Pause.svelte';
  import Mute from '$lib/components/icons/Mute.svelte';
  import UnMute from '$lib/components/icons/UnMute.svelte';

  export let assetID: string;
  export let file: string;
  let fileFormat = file ? file.split('.').pop() : null; // Extract the file format from the file string
  let sound: HowlType;
  let loaded = false;
  let isPlaying = false;
  let isMuted = false;
  let trackLength = 0;
  let currentPosition = 0;
  let intervalId: number;
  let progress = 0;
  $: mousePosition = 0;
  $: progress = (currentPosition / trackLength) * 100;

  onMount(async () => {
    if (assetID && fileFormat) {
      let mediaURL = generateMediaURL(assetID);
      sound = await new Howl({
        src: [mediaURL],
        format: [fileFormat],
        autoplay: true,
        loop: true,
        volume: 0.2,
        onload: () => {
          loaded = true;
          trackLength = sound.duration();
        },
        onpause: () => {
          isPlaying = false;
          clearInterval(intervalId);
        },
        onplay: () => {
          isPlaying = true;
          intervalId = setInterval(() => {
            currentPosition = sound.seek();
          }, 100);
        },
      });
    }
  });
  onDestroy(() => {
    loaded = false;
    if (sound) {
      sound.stop();
      sound.unload();
    }
  });

  function togglePlay() {
    if (!loaded) return;
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
  }

  function toggleMute() {
    if (!loaded) return;
    sound.mute(!isMuted);
    isMuted = !isMuted;
  }
  function seek(e: MouseEvent) {
    if (!loaded) return;
    const progressBar = e.currentTarget as HTMLElement;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const clickPositionInPercentage =
      (clickPosition / progressBar.offsetWidth) * 100;
    const seekPosition = (clickPositionInPercentage / 100) * trackLength;
    sound.seek(seekPosition);
    if (!isPlaying) {
      togglePlay();
    }
  }

  function updateMousePosition(e: MouseEvent) {
    if (!loaded) return;
    const progressBar = e.currentTarget as HTMLElement;
    const mousePositionPixels =
      e.clientX - progressBar.getBoundingClientRect().left;
    mousePosition = (mousePositionPixels / progressBar.offsetWidth) * 100;
  }
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      sound.seek(currentPosition + 5);
    } else if (e.key === 'ArrowLeft') {
      sound.seek(currentPosition - 5);
    }
  }
</script>

<div
  class="flex items-center justify-center space-x-4 m-5 bg-deep-blue-700 dark:bg-deep-green rounded-lg p-3 flex-shrink-0"
>
  <button
    on:click={togglePlay}
    class=" rounded-full h-12 w-12 p-2 bg-primary-300 text-deep-green text-xl enabled:hover:bg-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
    aria-label={isPlaying ? 'Pause' : 'Play'}
    disabled={!loaded}
  >
    {#if isPlaying}
      <Pause />
    {:else}
      <Play />
    {/if}
  </button>
  <button
    class="grow h-2 bg-deep-green dark:bg-deep-blue overflow-hidden rounded-sm relative"
    disabled={!loaded}
    on:click={seek}
    on:mousemove={updateMousePosition}
    on:mouseleave={() => {
      mousePosition = 0;
    }}
    on:keydown={handleKeyDown}
    aria-label="Audio Progress"
  >
    {#if loaded}
      <div
        class="h-2 bg-primary absolute top-0 left-0 z-10"
        style="width:{progress}%"
      ></div>
      <div
        class="h-2 bg-primary bg-opacity-10 absolute top-0 left-0 z-1 transition-all"
        style="width:{mousePosition}%"
      ></div>
    {/if}
  </button>
  <div>
    <p class="text-sm text-primary-300">
      {currentPosition.toFixed(2)} / {trackLength.toFixed(2)}
    </p>
  </div>

  <button
    disabled={!loaded}
    on:click={toggleMute}
    class="rounded-full h-8 w-8 bg-deep-green-900 bg-opacity-50 p-1 text-primary-300 enabled:hover:text-primary-200 enabled:bg-opacity-75 disabled:cursor-not-allowed"
    aria-label={isMuted ? 'Unmute' : 'x'}
  >
    {#if isMuted}
      <UnMute />
    {:else}
      <Mute />
    {/if}
  </button>
</div>
