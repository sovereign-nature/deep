<script lang="ts">
  import { onMount } from 'svelte';
  import { beforeNavigate } from '$app/navigation';
  import { slide, fly, fade } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { NavBrand, Navbar } from 'flowbite-svelte';
  import TableOfContents from '$lib/widgets/ToC/TableOfContents.svelte';
  import ContentNavButton from '$lib/widgets/ToC/ContentNavButton.svelte';
  import BtnWeb3Connect from '$lib/widgets/ButtonWalletConnect/Web3ConnectBtn.svelte';
  import Web3Notifications from '$lib/widgets/ButtonInboxConnect/Web3Notifications.svelte';
  import ThemeSwitch from '$lib/widgets/ThemeSwitch/ThemeSwitch.svelte';
  import Hamburger from '$lib/widgets/Navbar/HamburgerButton.svelte';
  import SearchLink from '$lib/widgets/Navbar/SearchLink.svelte';
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
  });
  $: toggleMobileMenu(menuOpen);
  function toggleMobileMenu(open: boolean) {
    if (browser) {
      document.documentElement.classList.toggle('menu-open', open);
    }
  }
</script>

<Navbar
  color="none"
  class={`${menuOpen ? 'dark' : ''}  navbar my-3 mb-6 md:my-6  container px-4 md:!ps-0 z-navbar`}
>
  <NavBrand
    href="/"
    class={`${menuOpen ? 'dark:text-gray-50' : 'dark:text-gray-300'} `}
  >
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
    in:slide={{ axis: 'x', duration: 300 }}
    out:slide={{ axis: 'x', duration: 300, delay: 300 }}
    class="mobile-menu fixed md:hidden w-[100vw] h-svh min-h-svh bg-primary-500 block z-overlay top-0 right-0 pt-16"
  >
    <div
      class="container px-6 pt-8 pb-20 w-full h-full flex flex-col items-start overflow-y-scroll"
    >
      <div
        out:fade|local={{ x: 20, opacity: 0, duration: 150, delay: 0 }}
        in:fly|local={{ x: 200, duration: 200, delay: 350 }}
      >
        {#if hasContentNav}
          <TableOfContents
            className="mb-8"
            on:linkClicked={() => (menuOpen = false)}
          ></TableOfContents>
        {/if}
      </div>

      <div
        class={hasContentNav ? 'mt-auto' : 'mt-5'}
        out:fade|local={{ x: 30, opacity: 0, duration: 150, delay: 0 }}
        in:fly|local={{ x: 200, duration: 200, delay: 450 }}
      >
        <SearchLink />
      </div>
      <div
        class="mt-3"
        out:fade|local={{ x: 30, opacity: 0, duration: 150, delay: 0 }}
        in:fly|local={{ x: 200, duration: 200, delay: 500 }}
      >
        <ThemeSwitch />
      </div>
    </div>
  </div>
{/if}
{#if hasContentNav}
  <ContentNavButton on:click={() => (menuOpen = !menuOpen)} />
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
