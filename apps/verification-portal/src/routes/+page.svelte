<script>
  import LayoutLanding from '$lib/containers/LayoutLanding.svelte';
  import ShareCard from '$lib/components/ShareCard.svelte';
  import SearchTabs from '$lib/containers/SearchTabs.svelte';
</script>

<ShareCard />

<LayoutLanding>
  <div class="text-white mb-20 md:text-left text-center">
    <h1 class="  text-3xl sm:text-4xl lg:text-[45px] font-regular">
      Welcome to our <span class="font-aeonik font-bold text-primary-300"
        >REAL</span
      > Verification Portal.
    </h1>
    <span class="font-serif text-[22px]"
      >Learn how your NFT is helping real-world conservation efforts around the
      globe.
    </span>
  </div>
  <SearchTabs />
</LayoutLanding>
