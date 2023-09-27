<script>
  import NavBar from '$lib/components/NavBar.svelte';
  import Search from '$lib/components/Search.svelte';
  import ShareCard from '$lib/components/ShareCard.svelte';
</script>

<ShareCard />

<div class="dark w-full flex flex-col min-h-screen content-center bg-Sni-img">
  <NavBar></NavBar>
  <div class="container px-5">
    <div class="w-full lg:w-4/5 mx-auto pt-12 md:pt-64">
      <h1
        class="text-3xl text-white mb-8 md:text-left text-center sm:text-4xl lg:text-5xl"
      >
        Search for your asset to verify
      </h1>
      <Search />
    </div>
  </div>
</div>
