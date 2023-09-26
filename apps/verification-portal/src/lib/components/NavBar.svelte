<script>
  import { DarkMode } from 'flowbite-svelte';
  import { SunSolid, MoonSolid } from 'flowbite-svelte-icons';
  import { Navbar, NavBrand } from 'flowbite-svelte';
  import logo from '$lib/assets/brand/sni_logo_round.svg';
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
  <DarkMode class="md:hidden" btnClass="text-green-800 text-sm pe-4 ">
    <svelte:fragment slot="lightIcon">
      <SunSolid />
    </svelte:fragment>
    <svelte:fragment slot="darkIcon">
      <MoonSolid />
    </svelte:fragment>
  </DarkMode>
  <div
    class="flex md:order-2 md:justify-end content-center w-full md:w-1/2 px-2 pt-4 lg:pt-0"
  >
    <slot />
    <!-- @TODO Remove before launch  -->
    <DarkMode
      class="ms-4 hidden md:block"
      btnClass="text-green-800 text-sm pe-4"
    >
      <svelte:fragment slot="lightIcon">
        <SunSolid />
      </svelte:fragment>
      <svelte:fragment slot="darkIcon">
        <MoonSolid />
      </svelte:fragment>
    </DarkMode>
  </div>
</Navbar>
