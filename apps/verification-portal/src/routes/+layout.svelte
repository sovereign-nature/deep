<script lang="ts">
  import '../app.postcss';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import {
    initializeContext,
    initializeModal,
    modalHandleTheme,
  } from '$lib/web3Modal';
  import { themeStore } from '$lib/features/themeSwitch';
  import { initializeInbox, setInboxContext } from '$lib/web3Inbox';
  import { browser } from '$app/environment';
  import Modal from '$lib/components/web3/inboxModal/index.svelte';

  let isLoading = false;

  beforeNavigate(({ to }) => {
    if (!to?.route.id) return; // No loading bar for external links

    isLoading = true;
  });

  afterNavigate(() => (isLoading = false));

  $: modalHandleTheme($themeStore);

  if (browser) {
    initializeContext();
    setInboxContext();
  }

  onMount(async () => {
    initializeModal();
    initializeInbox();

    modalHandleTheme($themeStore);
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
