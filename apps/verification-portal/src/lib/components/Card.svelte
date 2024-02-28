<script lang="ts">
  import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
  import NFTImage from '$lib/components/NFTImage.svelte';

  export let name: string;
  export let image: string;
  export let source = 'Hotel Hideaway';
  export let collection: string;
  export let address: string;
</script>

<a href={`/assets/${address}`} class="card-link">
  <div
    class="
    asset-card
    cursor-pointer
    transition duration-300
    bg-gray-100
    dark:bg-[#2C2C2C]
    bg-opacity-90
    dark:bg-opacity-10
    hover:opacity-100
    hover:bg-opacity-100
    hover:dark:bg-opacity-20
    flex items-center
    max-h-[120px]
    rounded-lg dark:text-white overflow-hidden"
  >
    <div class="mr-4 flex-shrink-0">
      <NFTImage
        containerClass=""
        imgClass="w-[90px] h-[120px] sm:w-[120px] sm:h-[120px] object-cover"
        url={image}
        alt={name}
        size={120}
      />
    </div>
    <div class="flex-1 flex flex-col my-4">
      <div class="sm:text-xl font-serif leading-snug pe-2 sm:pe-0">
        {name}
      </div>
      <div
        class="flex flex-col lg:flex-row text-xs lg:gap-2 opacity-50 relative"
      >
        <div class="whitespace-nowrap">
          <span class="font-bold whitespace-nowrap">Source:</span>
          {source}
        </div>
        <span class="hidden lg:block">|</span>
        <div class="mr-2 whitespace-nowrap">
          <span class="font-bold whitespace-nowrap">Collection:</span>
          {collection}
        </div>
        <!-- mobile select -->
        <div class="mt-2 whitespace-nowrap">
          <span
            class="whitespace-nowrap dark:text-primary-200 text-primary-400 sm:hidden float-right me-4"
            >Select<ArrowRight className="h-2 inline-block" />
          </span>
        </div>
      </div>
    </div>
    <div class="xl:flex-1 sm:flex justify-end items-center p-4 hidden">
      <span class="me-6 text-primary-300 show-on-hover hidden"> Select </span>
      <div
        class="asset-card-arrow transition flex justify-center items-center rounded-full h-12 w-12 bg-deep-green dark:bg-black text-primary-300 dark:text-primary-200"
      >
        <ArrowRight />
      </div>
    </div>
  </div>
</a>

<style>
  @media (min-width: 1024px) {
    .asset-card:hover .show-on-hover {
      display: block;
    }
  }
  .asset-card:hover .asset-card-arrow {
    @apply bg-primary-300 text-deep-green;
  }
  .dark .asset-card:hover .asset-card-arrow {
    @apply bg-primary-200 text-black;
  }
  .card-link {
    text-decoration: none;
    color: inherit;
  }
</style>
