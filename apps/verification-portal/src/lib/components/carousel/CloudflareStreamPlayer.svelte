<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import videojs from 'video.js';
  import 'video.js/dist/video-js.min.css';
  import type Player from 'video.js/dist/types/player';

  export let extraClass: string;
  export let muted: boolean = true;
  export let controls: boolean = true;
  export let srcUrl: string =
    'https://customer-snrxyfao77x71o7j.cloudflarestream.com/bb94abda052fc3a644dbb27902133147';
  export let paused: boolean = true;
  let player: Player;
  let playerId = generateUniqueId();

  $: togglePlay(paused);

  const posterConfig = 'thumbnails/thumbnail.jpg?time=1s&height=500';
  const streamManifest = 'manifest/video.m3u8';

  onMount(() => {
    const playerOptions = {
      fluid: true,
    };
    player = videojs(playerId, playerOptions);
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
    } else {
      player.play();
    }
  }
  function generateUniqueId() {
    return `player_${crypto.randomUUID()}`;
  }
</script>

{#if srcUrl}
  <video
    class={`${extraClass} video-js`}
    preload="auto"
    id={playerId}
    {controls}
    {muted}
    poster={`${srcUrl}/${posterConfig}`}
  >
    <source src={`${srcUrl}/${streamManifest}`} type="application/x-mpegURL" />
  </video>
{/if}
