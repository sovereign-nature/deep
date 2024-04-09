<script lang="ts">
  import { onMount } from 'svelte';
  import { beforeNavigate } from '$app/navigation';
  import { slide } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { NavBrand, Navbar } from 'flowbite-svelte';
  import TableOfContents from '$lib/widgets/ToC/TableOfContents.svelte';
  import BtnWeb3Connect from '$lib/widgets/ButtonWalletConnect/Web3ConnectBtn.svelte';
  import Web3Notifications from '$lib/widgets/ButtonInboxConnect/Web3Notifications.svelte';
  import ThemeSwitch from '$lib/widgets/ThemeSwitch/ThemeSwitch.svelte';
  import Hamburger from '$lib/widgets/Navbar/HamburgerButton.svelte';

  import logo from '$lib/assets/brand/sni_logo_round.svg';

  export let hasContentNav = false;
  let menuOpen = false;

  beforeNavigate(() => (menuOpen = false));

  onMount(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches }) => {
        if (matches) {
          console.log('change to dark mode!');
        } else {
          console.log('change to light mode!');
        }
      });
    // Add event listener for hash nav changes
    window.addEventListener('hashchange', () => {
      menuOpen = false;
    });
  });
  $: toggleMobileMenu(menuOpen);
  function toggleMobileMenu(open: boolean) {
    if (browser) {
      document.documentElement.classList.toggle('menu-open', open);
    }
  }
</script>

<!-- TODO: Move navbar to widgets? -->
<Navbar
  color="none"
  class={`${menuOpen ? 'dark' : ''} navbar my-3 mb-6 md:my-6  container px-4 md:!ps-0 z-navbar`}
>
  <NavBrand href="/" class="dark:text-gray-300">
    <img
      src={logo}
      class="navbar-brand-logo mr-2 sm:mr-4 xl:mr-9 h-9 sm:h-12 lg:h-20 lg:ms-3"
      alt="SNI Logo"
    />
    <span
      class="hidden md:block ms-0 lg:ms-2 text-base md:text-xl lg:text-2xl font-serif"
    >
      <strong>Sovereign Nature</strong>
      <span class="font-light">Initiative</span>
    </span>
    <span class="md:hidden text-[12px] sm:text-lg">
      <strong class="text-primary-300 dark:text-primary-200">REAL</strong>
      <span class="font-serif">Portal</span>
    </span>
  </NavBrand>

  <div class="ms-auto flex flex-row gap-x-2 sm:gap-x-4 text-white">
    <Web3Notifications responsive></Web3Notifications>

    <BtnWeb3Connect responsive></BtnWeb3Connect>
    <ThemeSwitch className="hidden md:flex"></ThemeSwitch>
    <Hamburger open={menuOpen} on:click={() => (menuOpen = !menuOpen)} />
  </div>
</Navbar>
{#if menuOpen}
  <div
    transition:slide={{ axis: 'x', duration: 300 }}
    class="mobile-menu fixed md:hidden w-[100vw] h-[100vh] bg-primary-500 block z-overlay top-0 right-0 z-overlay"
  >
    <div class="container px-6 mt-20 pt-6">
      {#if hasContentNav}
        <TableOfContents></TableOfContents>
      {/if}
      <ThemeSwitch className=""></ThemeSwitch>
    </div>
  </div>
{/if}

<style>
  @media only screen and (min-width: 768px) and (max-width: 830px) {
    .navbar-brand-logo {
      margin-left: 1rem;
    }
  }

  @media only screen and (max-width: 340px) {
    .navbar-brand-logo {
      display: none;
    }
  }
</style>
