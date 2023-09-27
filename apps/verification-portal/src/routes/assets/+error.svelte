<script lang="ts">
  import { page } from '$app/stores';
  import NavBar from '$lib/components/NavBar.svelte';
  import Search from '$lib/components/Search.svelte';
</script>

<div class="dark w-full flex flex-col min-h-screen content-center bg-Sni-img">
  <NavBar></NavBar>
  <div class="container px-5 min-h-screen">
    <div class="w-full lg:w-4/5 mx-auto pt-12 md:pt-40">
      <h1
        class="text-3xl text-white mb-8 md:text-left text-center sm:text-4xl lg:text-5xl"
      >
        <span class="text-primary-300 block md:inline"> {$page.status}</span>
        <span class="text-primary-300 hidden md:inline">| </span>
        {$page.error?.message}
      </h1>
      <h2
        class="text-base sm:text-2xl lg:text-3xl font-serif text-white md:text-left text-center mb-8"
      >
        Try searching for another asset...
      </h2>
      <Search />
    </div>
  </div>
</div>
