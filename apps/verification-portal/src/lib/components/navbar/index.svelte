<script>
  import { onMount } from 'svelte';

  import ThemeSwitch from '$lib/components/navbar/ThemeSwitch.svelte';
  import { Navbar, NavBrand } from 'flowbite-svelte';

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

<Navbar color="none" class=" my-6 container px-4">
  <NavBrand href="/">
    <img src={logo} class="mr-2 sm:mr-4 xl:mr-9 h-10 lg:h-20" alt="SNI Logo" />
    <span
      class="ms-2 text-base sm:text-xl lg:text-2xl font-serif dark:text-white"
    >
      <strong>Sovereign Nature</strong>
      <span class="font-light">Initiative</span>
    </span>
  </NavBrand>

  <div class="flex justify-end content-center md:w-1/2 lg:pt-0">
    <slot />

    <ThemeSwitch className="ms-4 "></ThemeSwitch>
  </div>
</Navbar>
