<script setup lang="ts">
  import IPFSimage from '$lib/components/IPFSimage.svelte';
  import SocialShare from '$lib/components/SocialShare.svelte';
  import Property from '$lib/typography/Property.svelte';
  import ModelViewer from '$lib/components/ModelViewer.svelte';
  import SimpleMap from '$lib/components/SimpleMap.svelte';
  import Subheader from '$lib/typography/Subheader.svelte';
  import { Card } from 'flowbite-svelte';

  import { page } from '$app/stores';

  $: currentPath = $page.url.toString();

  import modelUrl from '$lib/assets/Lion_golden_GLB_04.glb';

  export let data;
</script>

<div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-5 mb-16 md:px-8 xl:px-0">
  <div
    class="col-span-1 lg:col-span-4 xl:col-start-2 xl:col-span-3 flex justify-center w-100 mb-8 lg:mb-4"
  >
    <IPFSimage
      ipfsImageUrl={data.nftData.meta?.image}
      alt={data.nftData.meta?.name}
    />
  </div>
  <div class="lg:col-span-8 xl:col-span-7 dark:text-white">
    <div>
      <h1
        class="dark:text-white text-2xl md:text-3xl lg:text-4xl leading-tight mb-6"
      >
        {#if data.verifiedStatus}
          <span class="text-primary-300">Verified:</span>
        {/if}
        <span class="font-sans">
          {data.nftData.meta?.name}
        </span>
      </h1>
      {#if data.nftData.meta?.description}
        <p class=" text-sm mb-6">
          {data.nftData.meta?.description}
        </p>
      {/if}
    </div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <Property name="Source">
          <p>Hotel Hideaway</p>
        </Property>
        <Property name="ID">
          <p>0x7688x8s8</p>
        </Property>
        <Property name="Link Address">
          <p>{data.assetAddress}</p>
        </Property>
        <Property name="Copies Sold">
          <p>2</p>
        </Property>
      </div>

      <div>
        <span class="text-sm">Share your asset</span>
        <SocialShare shareUrl={currentPath} />
      </div>
    </div>
  </div>
</div>
{#if data.verifiedStatus}
  <div class="grid lg:grid-cols-2 gap-5">
    <!-- verified data -->
  </div>
{/if}
