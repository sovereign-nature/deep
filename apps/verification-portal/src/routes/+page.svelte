<script>
  import NavBar from '$lib/components/NavBar.svelte';
  import Search from '$lib/components/Search.svelte';
</script>

<div class="w-full flex flex-col min-h-screen content-center">
  <NavBar></NavBar>
  <div class="container px-5">
    <div class="w-full lg:w-4/5 mx-auto pt-40">
      <h1 class="text-4xl font-serif dark:text-white mb-8">
        Search for your asset to verify
      </h1>
      <Search />
    </div>
  </div>
</div>
