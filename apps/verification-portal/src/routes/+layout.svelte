<script lang="ts">
  import '../app.postcss';
  import { fade } from 'svelte/transition';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import {
    initializeContext,
    modalHandleTheme,
    initializeModal,
  } from '$lib/web3Modal';
  import { initThemeContext } from '$lib/themeContext';
  import { getContext, onMount } from 'svelte';
  import { initializeInbox, initializeInboxContext } from '$lib/web3Inbox';
  import { browser } from '$app/environment';
  import { isFeatureEnabled } from '$lib/utils';
  import Modal from '$lib/components/web3/inboxModal/index.svelte';

  let isLoading = false;

  beforeNavigate(() => (isLoading = true));
  afterNavigate(() => (isLoading = false));

  initThemeContext();
  const theme = getContext('theme');

  $: $theme, modalHandleTheme($theme);

  if (browser) {
    if (isFeatureEnabled('walletEnabled')) {
      initializeContext();
      if (isFeatureEnabled('notificationsEnabled')) {
        initializeInboxContext();
      }
    }
  }

  onMount(async () => {
    if (isFeatureEnabled('walletEnabled')) {
      const { createWeb3Modal, defaultConfig } = await import(
        '@web3modal/ethers'
      );
      initializeModal(createWeb3Modal, defaultConfig);
      if (isFeatureEnabled('notificationsEnabled')) {
        const { Web3InboxClient } = await import('@web3inbox/core');
        initializeInbox(Web3InboxClient);
      }
    }

    modalHandleTheme($theme);
  });

  export let data;
</script>

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
