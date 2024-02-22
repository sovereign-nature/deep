<script lang="ts">
  import { onMount, onDestroy, getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import videojs from 'video.js';
  import 'video.js/dist/video-js.min.css';
  import './VideoTheme.postcss';
  import type Player from 'video.js/dist/types/player';

  export let extraClass: string;
  export let muted: boolean = false;
  export let controls: boolean = true;
  export let srcUrl: string =
    'https://customer-snrxyfao77x71o7j.cloudflarestream.com/bb94abda052fc3a644dbb27902133147';
  export let paused: boolean = true;
  let player: Player;
  let playerId = generateUniqueId('player_');
  const playerIsActive: Writable<boolean> = getContext('playerIsActive');

  const posterConfig =
    '/thumbnails/thumbnail.gif?time=0s&height=300&duration=5s';
  const streamManifest = 'manifest/video.m3u8';
  // const captions = '/captions/en'; TODO check out if there is a way to generate/create captions

  const playerOptions = {
    fluid: true,
    muted: muted,
    controls: controls,
    poster: `${srcUrl}/${posterConfig}`,
  };

  $: togglePlay(paused);

  onMount(() => {
    player = videojs(playerId, playerOptions);
    if (player) {
      const makeFullscreenEvents = [
        'fullscreenchange',
        'enterpictureinpicture',
        'playing',
      ];
      const exitFullscreenEvents = ['pause', 'leavepictureinpicture'];

      makeFullscreenEvents.forEach((event) =>
        player.on(event, () => {
          $playerIsActive = true;
        })
      );
      exitFullscreenEvents.forEach((event) =>
        player.on(event, () => {
          $playerIsActive = false;
        })
      );

      player.on('fullscreenchange', () => {
        $playerIsActive = player.isFullscreen() ? true : false;
      });
    }
  });

  onDestroy(() => {
    if (player) {
      player.dispose();
    }
  });
  function togglePlay(pause: boolean) {
    if (!player) return;
    if (pause) {
      player.pause();
    }
  }
  function generateUniqueId(prefix: string) {
    return Math.random()
      .toString(36)
      .replace('0.', prefix || '');
  }
</script>

{#if srcUrl}
  <video
    id={playerId}
    class={`${extraClass} video-js vjs-theme-sni`}
    preload="auto"
  >
    <track src="" kind="captions" srclang="en" label="english_captions" />
    <source src={`${srcUrl}/${streamManifest}`} type="application/x-mpegURL" />
  </video>
{/if}
