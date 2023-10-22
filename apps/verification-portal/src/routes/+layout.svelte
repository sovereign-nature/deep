<script>
  import '../app.postcss';
  import { fade } from 'svelte/transition';
  import { beforeNavigate, afterNavigate } from '$app/navigation';

  let isLoading = false;

  beforeNavigate(() => (isLoading = true));
  afterNavigate(() => (isLoading = false));

  export let data;
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{#if isLoading}
  <!-- <div class="absolute z-60 top-0 left-0 w-full h-1 bg-primary-300 block"></div> -->
  <div
    class="fixed top-0 left-0 sm:h-1 h-3 bg-primary-300 w-0 animate-loading-bar z-50"
  ></div>
{/if}

{#key data.pathname}
  <div in:fade={{ duration: 200, delay: 100 }} out:fade={{ duration: 100 }}>
    <slot />
  </div>
{/key}

<style>
  @keyframes loading-bar-animation {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }

  .animate-loading-bar {
    animation: loading-bar-animation 2s ease-out infinite;
    animation-delay: 0.2s;
  }
</style>
