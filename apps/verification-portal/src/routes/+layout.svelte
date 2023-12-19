<script lang="ts">
  import '../app.postcss';
  import { fade } from 'svelte/transition';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { initializeModal, modalHandleTheme } from '$lib/web3Modal';
  import { initThemeContext } from '$lib/themeContext';
  import { getContext, onMount } from 'svelte';
  import { initializeInbox } from '$lib/web3Inbox';
  import { browser } from '$app/environment';
  let isLoading = false;
  import { isFeatureEnabled } from '$lib/utils';
  import Modal from '$lib/components/web3/inboxModal/index.svelte';

  beforeNavigate(() => (isLoading = true));
  afterNavigate(() => (isLoading = false));

  initThemeContext();
  const theme = getContext('theme');

  $: $theme, modalHandleTheme($theme);

  if (browser) {
    if (isFeatureEnabled('walletEnabled')) {
      initializeModal();
      if (isFeatureEnabled('notificationsEnabled')) {
        initializeInbox();
      }
    }
  }

  onMount(async () => {
    modalHandleTheme($theme);
  });

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
  <div
    class="fixed top-0 left-0 h-1 bg-primary-300 w-0 animate-loading-bar z-50"
  ></div>
{/if}

{#key data.pathname}
  <div in:fade={{ duration: 200, delay: 100 }} out:fade={{ duration: 100 }}>
    <Modal />

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
