<script lang="ts">
  import '../app.postcss';
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { Toaster } from '@sni/ui-kit';
  import NavBar from '$lib/components/navbar/index.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import {
    initializeContext,
    initializeModal,
    modalHandleTheme,
  } from '$lib/features/web3Modal';
  import { themeStore } from '$lib/features/themeSwitch';
  import { initializeInbox, setInboxContext } from '$lib/features/web3Inbox';
  import { browser } from '$app/environment';
  import Modal from '$lib/widgets/InboxModal/InboxModal.svelte';
  import NftClaim from '$lib/widgets/NFTClaim/NFTClaim.svelte';
  let isLoading = false;

  beforeNavigate(({ to }) => {
    if (!to?.route.id) return; // No loading bar for external links

    isLoading = true;
  });

  afterNavigate(() => (isLoading = false));

  $: modalHandleTheme($themeStore ?? '');

  if (browser) {
    initializeContext();
    setInboxContext();
  }

  onMount(async () => {
    initializeModal();
    initializeInbox();

    //TODO: Do we need it twice?
    modalHandleTheme($themeStore ?? '');
  });
  $: hasContentNav = $page.route.id === '/assets/[assetAddress]';
  export let data;
</script>

<NftClaim></NftClaim>

<!-- <Toaster /> -->
<Toaster.Custom mode={$themeStore} />
{#if isLoading}
  <div
    class="fixed top-0 left-0 h-1 bg-primary-300 w-0 animate-loading-bar z-50"
  ></div>
{/if}

{#key data.pathname}
  <div>
    <Modal />
    <div
      class="w-full flex flex-col min-h-screen content-center justify-center"
    >
      <NavBar {hasContentNav}></NavBar>
      <div class="w-full flex-auto">
        <div
          class="container mx-auto py-8"
          in:fade={{ duration: 200, delay: 100 }}
          out:fade={{ duration: 100 }}
        >
          <slot />
        </div>
      </div>
      <Footer></Footer>
    </div>
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
