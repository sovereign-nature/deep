<script lang="ts">
  import NavBar from '$lib/components/NavBar.svelte';
  import SearchSm from '$lib/components/SearchSM.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<div class="w-full flex flex-col min-h-screen content-center justify-center">
  <NavBar>
    <SearchSm></SearchSm>
  </NavBar>
  <div class="w-full m-auto">
    <div class="container mx-auto py-8 px-4">
      <slot />
    </div>
  </div>
  <Footer></Footer>
</div>
