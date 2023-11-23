<script lang="ts">
  import NavBar from '$lib/components/navbar/index.svelte';
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
  // import SearchSm from '$lib/components/search/SearchSM.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import BtnWeb3Connect from '$lib/components/web3/BtnWeb3Connect.svelte';
</script>

<div class="w-full flex flex-col min-h-screen content-center justify-center">
  <NavBar>
    <!-- <SearchSm></SearchSm> -->
    <!-- <w3m-button
      icon="show"
      size="sm"
      class="text-gray-300 dark:text-primary-500 text-sm pe-1 opacity-50 hover:opacity-100 active:opacity-100"
    >
    </w3m-button> -->
    <BtnWeb3Connect></BtnWeb3Connect>
    <a
      href="/"
      class="text-gray-300 dark:text-primary-500 text-sm pe-1 opacity-50 hover:opacity-100 active:opacity-100"
      title="Search"
    >
      <span class="sr-only">Search</span>

      <SearchIcon className="h-4 w-4 "></SearchIcon>
    </a>
  </NavBar>
  <div class="w-full m-auto">
    <div class="container mx-auto py-8">
      <slot />
    </div>
  </div>
  <Footer></Footer>
</div>
