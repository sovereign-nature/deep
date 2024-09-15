<script lang="ts">
  import HexagonGridIcon from '$lib/components/icons/HexagonGridIcon.svelte';
  import Subheader from '$lib/shared/typography/Subheader.svelte';
  import { Button } from 'flowbite-svelte';
  import LL from '$lib/shared/i18n/i18n-svelte';
  export let name: string;
  export let infoLink: string | undefined;
  import { isFeatureEnabled } from '$lib/shared/utils';

  const showDotphin = isFeatureEnabled('dotphinWidget');
</script>

<div
  class="mx-0 sm:mx-4 lg:mx-8 xl:mx-4 dark:bg-gray-200 bg-gray-100 sm:rounded-lg mb-5 xl:rounded-lg text-deep-green overflow-hidden"
>
  <div class="grid lg:grid-cols-6 grid-flow-row lg:grid-flow-col">
    <div
      class="px-12 sm:px-8 md:px-11 py-8 pb-4 md:pb-8 xl:pt-11 col-span-3 grid grid-flow-row-dense grid-cols-5 items-center"
    >
      <div
        class="col-span-1 col-start-5 sm:col-start-1 text-center self-center sm:self-start md:self-center"
      >
        <HexagonGridIcon
          className=" fill-primary-500 text-deep-green-500 h-12 sm:h-[85px]"
        />
      </div>

      <div class="col-span-4 col-start-1 sm:col-start-2">
        <Subheader
          id="multipass"
          title={$LL.assets.multipass.cardTitle()}
          className="md:!text-base font-normal text-black dark:text-deep-green"
          >{$LL.assets.multipass.cardTitle()}</Subheader
        >
        <h3 class="text-6xl">{name}</h3>
      </div>
    </div>
    <div
      class="bg-multipass px-12 sm:px-8 md:px-11 py-8 xl:pt-11 col-span-3 flex flex-col sm:flex-row justify-start sm:items-end gap-5"
    >
      <div class="flex gap-1 flex-col">
        {#if !showDotphin}
          <span class="text-sm font-aeonik font-bold text-gray-200">
            {$LL.assets.multipass.comingSoon()}</span
          >
        {/if}
        <Button
          color="none"
          class="z-50 transition-colors  bg-deep-blue-800 hover:bg-primary-400 text-white rounded-sm  border-none disabled:opacity-80 !py-2.5 !px-4 text-lg  uppercase"
          type="button"
          tabindex="1"
          href="/#DOTphin"
          disabled={!showDotphin}
        >
          {$LL.assets.multipass.CTA()}
        </Button>
      </div>

      {#if infoLink}
        <Button
          color="none"
          class="z-50 hover:bg-primary-300 bg-primary-400 text-white rounded-sm  border-none !py-2.5 !px-4 text-lg uppercase"
          type="button"
          tabindex="1"
          href={infoLink}
          target="_blank"
        >
          {$LL.assets.multipass.infoLink({ multipassName: name })}
        </Button>
      {/if}
    </div>
  </div>
</div>

<style>
  .bg-multipass {
    background-image: url('https://imagedelivery.net/TbEOGfUBcfmfflqdtuuZVA/7f77fa3a-1e23-4920-7802-9794d1886f00/public');
    background-size: cover;
    background-position: 50% 40%;
    background-repeat: no-repeat;
  }
</style>
