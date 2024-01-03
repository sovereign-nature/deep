<script lang="ts">
  import NavBar from '$lib/components/navbar/index.svelte';
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
  // import SearchSm from '$lib/components/search/SearchSM.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import RolloverBtn from '$lib/components/RolloverBtn.svelte';
</script>

<div class="w-full flex flex-col min-h-screen content-center justify-center">
  <NavBar>
    <!-- <RolloverBtn type="secondary" url="/" ariaLabel="search">
      <SearchIcon slot="icon" className="h-4 w-4 mx-1 "></SearchIcon>
    </RolloverBtn> -->
  </NavBar>
  <div class="w-full m-auto">
    <div class="container mx-auto py-8">
      <slot />
    </div>
  </div>
  <Footer></Footer>
</div>
