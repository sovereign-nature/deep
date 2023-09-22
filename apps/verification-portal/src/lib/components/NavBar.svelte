<script>
  import { DarkMode } from 'flowbite-svelte';
  import { SunSolid, MoonSolid } from 'flowbite-svelte-icons';
  import { Navbar, NavBrand } from 'flowbite-svelte';
  import logo from '$lib/assets/brand/sni_logo_round.svg';
</script>

<Navbar color="none" class="my-6 container lg:px-0">
  <NavBrand href="/">
    <img src={logo} class="mr-9 h-12 sm:h-20" alt="SNI Logo" />
    <span class="ms-2 text-2xl font-serif dark:text-white">
      <strong>Sovereign Nature</strong>
      <span class="font-light">Initiative</span>
    </span>
  </NavBrand>
  <div
    class="flex md:order-2 md:justify-end content-center w-full lg:w-1/2 px-2 pt-4 lg:pt-0"
  >
    <slot />
    <!-- @TODO Remove before launch  -->
    <DarkMode class="ms-4" btnClass="text-green-800 text-sm">
      <svelte:fragment slot="lightIcon">
        <SunSolid />
      </svelte:fragment>
      <svelte:fragment slot="darkIcon">
        <MoonSolid />
      </svelte:fragment>
    </DarkMode>
  </div>
</Navbar>
