<script lang="ts">
  import siteConfigs from '$lib/shared/siteConfigs';
  import HexagonGridIcon from '$lib/components/icons/HexagonGridIcon.svelte';
  import Subheader from '$lib/shared/typography/Subheader.svelte';
  import HexagonEggIcon from '$lib/components/icons/HexagonEggIcon.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';

  const cardLink = siteConfigs?.contentLinks?.DOTphin?.default || '';
  export let name: string;
</script>

<div
  class=" bg-multipass bg-deep-green rounded-t-lg xl:rounded-t-lg text-white overflow-hidden"
>
  <div class=" grid lg:grid-cols-4 grid-flow-row lg:grid-flow-col">
    <div class="col-span-2 px-12 py-4 sm:py-12">
      <Subheader
        id="multipass"
        title={'Multipass collection'}
        className="md:!text-base font-normal text-white "
        >{$LL.multipass.header.subtitle()}</Subheader
      >
      <h3 class="text-4xl leading-tight">
        {$LL.multipass.header.title({ collectionName: name })}
      </h3>
      {#if cardLink}
        <a
          href="https://sovereignnature.com/dotphin"
          target="_blank"
          class="text-primary-200 hover:text-white text-xs"
        >
          {$LL.multipass.header.moreInfo()}
        </a>
      {/if}
    </div>
    <div
      class=" hidden sm:text-white pb-4 sm:px-8 md:px-11 sm:py-8 xl:pt-11 col-span-2 sm:flex flex-row justify-start sm:items-center gap-5"
    >
      <div
        class=" sm:bg-black sm:bg-opacity-35 rounded-lg p-4 flex flex-col items-center text-center w-full md:w-md"
      >
        <HexagonGridIcon
          className=" fill-primary-500 text-deep-green-500 h-12 w-12 sm:h-[65px] sm:w-[65px]"
        />
        <span class="text-xs pt-2">{$LL.multipass.header.proofsSubtitle()}</span
        >
      </div>

      <div
        class=" sm:bg-black sm:bg-opacity-35 rounded-lg p-4 flex flex-col items-center text-center w-full md:w-md"
      >
        <HexagonEggIcon
          className=" fill-primary-500 text-deep-green-500 h-12 w-12 sm:h-[65px] sm:w-[65px]"
        />
        <span class="text-xs pt-2">{$LL.multipass.header.nftSubtitle()}</span>
      </div>
    </div>
  </div>
</div>

<style>
  /* TODO: Use SNI CDN image if we keep this */

  .bg-multipass {
    background-image: url('https://imagedelivery.net/TbEOGfUBcfmfflqdtuuZVA/7f77fa3a-1e23-4920-7802-9794d1886f00/public');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 40%;
    text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.8);
  }
</style>
