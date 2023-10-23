<script>
  import { DarkMode } from 'flowbite-svelte';
  import { Navbar, NavBrand } from 'flowbite-svelte';
  import MoonIcon from './icons/MoonIcon.svelte';
  import SunIcon from './icons/SunIcon.svelte';
  import logo from '$lib/assets/brand/sni_logo_round.svg';

  export let themeSwitch = true;
</script>

<Navbar color="none" class="my-6 container px-4">
  <NavBrand href="/">
    <img src={logo} class="mr-4 xl:mr-9 h-10 lg:h-20" alt="SNI Logo" />
    <span
      class="ms-2 text-base sm:text-xl lg:text-2xl font-serif dark:text-white"
    >
      <strong>Sovereign Nature</strong>
      <span class="font-light">Initiative</span>
    </span>
  </NavBrand>
  {#if themeSwitch}
    <DarkMode
      class="md:hidden"
      btnClass="text-gray-300 dark:text-primary-500 text-sm pe-4 opacity-50 hover:opacity-100 active:opacity-100"
    >
      <svelte:fragment slot="lightIcon">
        <SunIcon className="w-4 h-4" />
      </svelte:fragment>
      <svelte:fragment slot="darkIcon">
        <MoonIcon className="w-4 h-4" />
      </svelte:fragment>
    </DarkMode>
  {/if}
  <div
    class="flex md:order-2 md:justify-end content-center w-full md:w-1/2 px-2 pt-4 lg:pt-0"
  >
    <slot />
    {#if themeSwitch}
      <DarkMode
        class="ms-4 hidden md:block"
        btnClass="text-gray-300 dark:text-primary-500 text-sm pe-4 opacity-50 hover:opacity-100 active:opacity-100"
      >
        <svelte:fragment slot="lightIcon">
          <SunIcon className="w-4 h-4" />
        </svelte:fragment>
        <svelte:fragment slot="darkIcon">
          <MoonIcon className="w-4 h-4" />
        </svelte:fragment>
      </DarkMode>
    {/if}
  </div>
</Navbar>
