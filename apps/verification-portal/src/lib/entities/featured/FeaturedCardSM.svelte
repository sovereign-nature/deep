<script lang="ts">
  import type { DeepAsset } from '@sni/clients/assets-client/types';
  import truncate from 'lodash/truncate';
  import NFTImage from '$lib/components/NFTImage.svelte';
  export let item: DeepAsset;
  let showId = item.tokenId !== undefined;
  import LL from '$lib/shared/i18n/i18n-svelte';
</script>

<div
  class="card-higlight rounded-lg overflow-hidden max-w-[300px] min-w-[200px] shadow-lg bg-deep-green-600 dark:bg-deep-green-900 relative h-full flex flex-col"
>
  <div class="relative overflow-hidden h-64 text-white">
    <NFTImage
      imgPlaceholderClass="w-[300px] h-64"
      containerClass="w-[300px] h-64 img-container "
      imgClass="w-[300px] h-64 object-cover object-center"
      url={item.image}
      alt={item.name}
      size={400}
    />
  </div>

  <div class="px-4 py-4 bg-gray-100">
    <div class="grid grid-flow-row gap-1">
      <p
        class="card-title col-span-full text-[16px] md:text-xl text-[#333333] font-serif leading-snug duration-300 line-clamp-2"
      >
        {item.name}
      </p>
      {#if showId}
        <div class="col-span-full text-[#333333]">
          <p class="text-xs">
            Token Id: {truncate(item.tokenId, { length: 25 })}
          </p>
        </div>
      {/if}
    </div>
    <a class="stretched-link" href={`/assets/${item.address}`}
      ><span class="sr-only">{$LL.selectToken()} </span></a
    >
  </div>
</div>
