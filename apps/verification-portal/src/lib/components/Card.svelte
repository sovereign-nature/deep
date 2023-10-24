<script lang="ts">
  import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
  import { generateAssetURL } from '$lib/utils';

  export let name: string,
    image,
    source = 'Hotel Hideaway',
    id,
    collection: string,
    prefix;
  export let isList = false; // Set to false for horizontal layout
  const imgUrl = generateAssetURL(image, 120);
  const did = `${prefix}${id}`;
</script>

<a href={`/assets/${did}`} class="card-link">
  <div
    class="
    asset-card
    cursor-pointer
    transition duration-300
    bg-[#2C2C2C]
    bg-opacity-40
    hover:opacity-100
    hover:bg-opacity-60
    flex items-center
    max-h-[120px]
    rounded-lg text-white overflow-hidden"
    class:card-square={!isList}
    class:card-horizontal={isList}
  >
    {#if !isList}
      <div class="mb-4">
        <img class="w-16 h-16 rounded-full" src={imgUrl} alt={name} />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="text-xl font-semibold mb-2">{name}</div>
        <div class="flex mb-2 text-xs">
          <div class="mr-2 whitespace-nowrap">
            <span class="font-bold whitespace-nowrap">Source:</span>
            {source}
          </div>
          <div class="mr-2 whitespace-nowrap">
            <span class="font-bold whitespace-nowrap">Collection:</span>
            {collection}
          </div>
        </div>
      </div>
    {/if}
    {#if isList}
      <div class="mr-4 flex-shrink-0">
        <img
          class="w-[90px] h-[120px] sm:w-[120px] sm:h-[120px] object-cover"
          src={imgUrl}
          alt="Avatar"
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
              class="fwhitespace-nowrap text-primary-200 sm:hidden float-right me-4"
              >Select<ArrowRight className="h-2 inline-block" />
            </span>
          </div>
        </div>
      </div>
      <div class="xl:flex-1 sm:flex justify-end items-center p-4 hidden">
        <span class="me-6 text-primary-300 show-on-hover hidden"> Select </span>
        <div
          class="asset-card-arrow transition-bg flex justify-center items-center rounded-full h-12 w-12 bg-black text-primary-300"
        >
          <ArrowRight />
        </div>
      </div>
    {/if}
  </div>
</a>

<style>
  @media (min-width: 1024px) {
    .asset-card:hover .show-on-hover {
      display: block;
    }
  }
  .asset-card:hover .asset-card-arrow {
    @apply bg-primary-200 text-black;
  }
  .card-link {
    text-decoration: none;
    color: inherit;
  }
  .card-square {
    @apply flex-col aspect-square min-h-full;
  }
  .card-horizontal {
    @apply flex-row;
  }
</style>
