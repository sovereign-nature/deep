<script>
  import { onMount } from 'svelte';
  import { Dropdown, DropdownItem } from 'flowbite-svelte';
  import BtnWeb3Connect from '$lib/components/web3/Web3ConnectBtn.svelte';
  import Web3Notifications from '$lib/components/web3/Web3Notifications.svelte';
  import ThemeSwitch from '$lib/components/navbar/ThemeSwitch.svelte';
  let dropdownOpen = false;

  import { NavBrand, Navbar } from 'flowbite-svelte';

  import logo from '$lib/assets/brand/sni_logo_round.svg';

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
</script>

<Navbar color="none" class=" my-6 container px-4 ">
  <NavBrand href="/">
    <img src={logo} class="mr-2 sm:mr-4 xl:mr-9 h-10 lg:h-20" alt="SNI Logo" />
    <span
      class="ms-2 text-base sm:text-xl lg:text-2xl font-serif dark:text-white"
    >
      <strong>Sovereign Nature</strong>
      <span class="font-light">Initiative</span>
    </span>
  </NavBrand>

  <button class="nav-hamburger md:hidden dark:text-white"> &#9776;</button>
  <div
    class="hidden md:flex flex-col sm:flex-row justify-end items-start sm:items-center content-center md:w-1/2 lg:pt-0 gap-x-4"
  >
    <BtnWeb3Connect></BtnWeb3Connect>

    <Web3Notifications></Web3Notifications>
    <slot />
    <ThemeSwitch></ThemeSwitch>
  </div>

  <Dropdown
    triggeredBy=".nav-hamburger"
    bind:open={dropdownOpen}
    containerClass="md:hidden min-h-[300px] z-50 relative dark:bg-deep-green-700 dark:text-white"
  >
    <DropdownItem
      class=" h-12 py-3 flex justify-end hover:dark:bg-transparent hover:bg-transparent"
    >
      <BtnWeb3Connect></BtnWeb3Connect>
    </DropdownItem>

    <DropdownItem
      class=" py-3 flex justify-end hover:dark:bg-transparent hover:bg-transparent"
    >
      <Web3Notifications></Web3Notifications>
    </DropdownItem>

    <DropdownItem
      class=" py-3 flex justify-end hover:dark:bg-transparent hover:bg-transparent"
    >
      <ThemeSwitch></ThemeSwitch>
    </DropdownItem>
  </Dropdown>
</Navbar>
