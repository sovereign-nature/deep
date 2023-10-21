<script>
  import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
  import { generateAssetURL } from '$lib/utils';

  export let name,
    image,
    source = 'Hotel Hideaway',
    id,
    collection,
    prefix;
  export let isList = false; // Set to false for horizontal layout
  const imgUrl = generateAssetURL(image, 90);
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
    opacity-60
    hover:opacity-100
    hover:bg-opacity-60
    flex items-center
    p-4
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
        <div class="flex mb-2 text-sm">
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
        <img class="w-[90px] h-[90px] rounded-full" src={imgUrl} alt="Avatar" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="text-xl font-aeonic">{name}</div>
        <div class="flex flex-col lg:flex-row text-sm lg:gap-2 opacity-50">
          <div class="whitespace-nowrap">
            <span class="font-bold whitespace-nowrap">Source:</span>
            {source}
          </div>
          <span class="hidden lg:block">|</span>
          <div class="mr-2 whitespace-nowrap">
            <span class="font-bold whitespace-nowrap">Collection:</span>
            {collection}
          </div>
        </div>
      </div>
      <div class="flex-1 flex justify-end items-center">
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
  .asset-card:hover .show-on-hover {
    display: block;
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
