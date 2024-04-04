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
  </div>

  <div
    class="transition delay-100 duration-500 bg-gray-300 text-[#333333] hover:bg-primary-200 px-5 py-4 cursor-pointer text-[14px] text-bold mt-auto"
  >
    <a class="stretched-link" href={`/assets/${item.address}`}
      >{$LL.selectToken()}</a
    >
    <span
      class="arrow-link duration-500 text-4xl leading-tight absolute right-5 bottom-5"
    >
      <svg
        width="24"
        height="9"
        viewBox="0 0 24 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.086 8.35001C18.426 7.62468 18.7547 6.99001 19.072 6.44601C19.412 5.90201 19.7407 5.44868 20.058 5.08601H0.236023V3.65801H20.058C19.7407 3.27268 19.412 2.80801 19.072 2.26401C18.7547 1.72001 18.426 1.09668 18.086 0.394012H19.276C20.704 2.04868 22.2 3.27268 23.764 4.06601V4.67801C22.2 5.44868 20.704 6.67268 19.276 8.35001H18.086Z"
          fill="#010510"
        />
      </svg>
    </span>
  </div>
</div>
