<script lang="ts">
  import type { AssetFeatured } from '$lib/types';
  import NFTImage from '$lib/components/NFTImage.svelte';
  export let item: AssetFeatured;
  export let showId = false;
  const containerClass = showId ? 'sm:grid-cols-6' : 'sm:grid-cols-4';
  const titleClass = showId ? 'col-span-3 lg:col-span-4' : 'col-span-full';
</script>

<div
  class="card-higlight rounded-lg overflow-hidden min-w-200px shadow-lg bg-gray-100 relative h-full"
>
  <div
    class="relative img-container overflow-hidden h-32 md:h-48 lg:h-56 text-white bg-deep-green"
  >
    <NFTImage
      containerClass=""
      imgClass="w-full h-32 md:h-48 lg:h-56  object-cover object-center lg:object-top"
      url={item.image}
      alt={item.name}
      size="400"
    />
  </div>

  <div class="px-4 py-4 lg:px-6 lg:h-20">
    <div
      class={`${containerClass} grid grid-flow-row sm:grid-cols-6 gap-1 md:gap-5`}
    >
      <p
        class={`${titleClass} card-title col-span-full lg:text-xl text-[#333333] font-serif leading-snug duration-300 line-clamp-2`}
      >
        {item.name}
      </p>
      {#if showId}
        <div class="col-span-2 text-[#333333] flex flex-col">
          <p class="text-xs text-[#333333">Token Id:</p>

          <p class="sm:text-xl text-[#333333] font-serif">{item.tokenId}</p>
        </div>
      {/if}
      <div class="text-[#333333] lg:hidden">
        <a class="stretched-link" href={`/assets/${item.address}`}>
          <span class="sr-only">select</span>
        </a>
        <span
          class="arrow-link duration-500 text-4xl leading-tight absolute right-3 bottom-2"
        >
          →</span
        >
      </div>
    </div>
  </div>

  <div
    class="hidden lg:block transition delay-100 duration-500 bg-gray-300 text-[#333333] text-opacity-70 hover:text-opacity-100 px-5 py-4 cursor-pointer text-sm"
  >
    <a class="stretched-link" href={`/assets/${item.address}`}>
      Select this token
    </a>
    <span
      class="arrow-link duration-500 text-4xl leading-tight absolute right-3 bottom-2"
      >→</span
    >
  </div>
</div>
