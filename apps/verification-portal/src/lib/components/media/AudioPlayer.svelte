<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Howl } from 'howler';
  import { Howl as HowlType } from 'howler';
  import { browser } from '$app/environment';
  import { generateMediaURL, getCookie, setCookie } from '$lib/utils';
  import Play from '$lib/components/icons/Play.svelte';
  import Pause from '$lib/components/icons/Pause.svelte';
  import Mute from '$lib/components/icons/Mute.svelte';
  import UnMute from '$lib/components/icons/UnMute.svelte';

  export let assetID: string;
  export let file: string;
  let fileFormat = file ? file.split('.').pop() : null; // Extract the file format from the file string
  let audioPlayer: HowlType;
  let loaded = false;
  let isPlaying = false;
  let isMuted = false;
  let trackLength = 0;
  let currentPosition = 0;
  let intervalId: number;
  let progress = 0;
  // let loadError = false; //@TODO decide on error state feedback
  $: mousePosition = 0;
  $: progress = (currentPosition / trackLength) * 100;

  onMount(async () => {
    if (browser && assetID && fileFormat) {
      const muted = getCookie('player_muted') === 'true';
      const autoplay = getCookie('player_autoplay') !== 'false' && !muted;
      isMuted = muted;
      let mediaURL = generateMediaURL(assetID);
      audioPlayer = await new Howl({
        src: [mediaURL],
        format: [fileFormat],
        autoplay: autoplay,
        loop: !isMuted,
        volume: 0.2,
        onload: () => {
          loaded = true;
          trackLength = audioPlayer.duration();
        },
        onloaderror: (error) => {
          console.error(`Load error: ${error}, mediaURL: ${mediaURL}`); //@TODO trigger sentry?
          // loadError = true;
        },
        onpause: () => {
          isPlaying = false;
          clearInterval(intervalId);
          //if user has paused the audio, set autoplay to be paused for future visits
          setCookie('player_autoplay', 'false');
        },
        onplay: () => {
          isPlaying = true;

          intervalId = setInterval(() => {
            currentPosition = audioPlayer.seek();
          }, 100);
          //if user has played the audio, set autoplay to be played for future visits
          setCookie('player_autoplay', 'true');
        },
      });
    }
  });
  onDestroy(() => {
    loaded = false;
    if (audioPlayer) {
      audioPlayer.stop();
      audioPlayer.unload();
    }
  });

  function togglePlay() {
    if (!loaded) return;
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
      audioPlayer.mute(false);
      isMuted = false;
    }
  }
  //@TODO add volume control dropdown to the audioPlayer state button (currently mute/unmute)
  function toggleMute() {
    if (!loaded) return;
    audioPlayer.mute(!isMuted);
    audioPlayer.loop(!isMuted);
    isMuted = !isMuted;
    //keep user mute state preferences for future visits
    setCookie('player_muted', String(isMuted));
  }
  function seek(e: MouseEvent) {
    if (!loaded) return;
    const progressBar = e.currentTarget as HTMLElement;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const clickPositionInPercentage =
      (clickPosition / progressBar.offsetWidth) * 100;
    const seekPosition = (clickPositionInPercentage / 100) * trackLength;
    audioPlayer.seek(seekPosition);
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
      audioPlayer.seek(currentPosition + 5);
    } else if (e.key === 'ArrowLeft') {
      audioPlayer.seek(currentPosition - 5);
    }
  }
</script>

<div
  class="flex items-center justify-center space-x-4 m-5 bg-deep-blue-700 dark:bg-deep-green rounded-lg p-3 flex-shrink-0"
>
  <button
    class=" rounded-full h-12 w-12 p-2 bg-primary-300 text-deep-green text-xl enabled:hover:bg-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
    aria-label={isPlaying ? 'Pause' : 'Play'}
    disabled={!loaded}
    on:click={togglePlay}
  >
    {#if isPlaying}
      <Pause />
    {:else}
      <Play />
    {/if}
  </button>
  <button
    class="grow h-2 bg-deep-green dark:bg-deep-blue overflow-hidden rounded-sm relative"
    aria-label="Audio Progress"
    disabled={!loaded}
    on:click={seek}
    on:mousemove={updateMousePosition}
    on:mouseleave={() => {
      mousePosition = 0;
    }}
    on:keydown={handleKeyDown}
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
    class="rounded-full h-8 w-8 bg-deep-green-900 bg-opacity-50 p-1 text-primary-300 enabled:hover:text-primary-200 enabled:bg-opacity-75 disabled:cursor-not-allowed"
    aria-label={isMuted ? 'Unmute' : 'Mute'}
    disabled={!loaded}
    on:click={toggleMute}
  >
    {#if isMuted}
      <UnMute />
    {:else}
      <Mute />
    {/if}
  </button>
</div>
