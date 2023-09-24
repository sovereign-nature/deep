<script setup lang="ts">
  import Header from '$lib/typography/Header.svelte';
  import IPFSimage from '$lib/components/IPFSimage.svelte';
  import Property from '$lib/typography/Property.svelte';
  import ModelViewer from '$lib/components/ModelViewer.svelte';
  import SimpleMap from '$lib/components/SimpleMap.svelte';
  import Subheader from '$lib/typography/Subheader.svelte';
  import { Card } from 'flowbite-svelte';

  import modelUrl from '$lib/assets/Lion_golden_GLB_04.glb';

  export let data;
</script>

<div class="grid lg:grid-cols-4">
  <div>
    <IPFSimage
      ipfsImageUrl={data.nftData.meta?.image}
      alt={data.nftData.meta?.name}
    />
  </div>
  <div class="col-span-3">
    <div>
      <h1 class="dark:text-white text-5xl">
        {#if data.verifiedStatus}
          <span class="text-primary-300">Verified:</span>
        {/if}
        <span class="font-sans">
          {data.nftData.meta.name}
        </span>
      </h1>
    </div>
    <div class="grid grid-cols-2 gap-8">
      <!-- <Subheader>{data.data.id}</Subheader> -->
      <div>
        <p class="dark:text-white text-sm mb-6">
          {data.nftData.meta.description}
        </p>
        <Property name="Game">
          <p>Hotel Hideaway</p>
        </Property>
        <Property name="ID">
          <p>0x7688x8s8</p>
        </Property>
        <Property name="Link Address">
          <p>0x068647392974</p>
        </Property>
        <Property name="Copies Sold">
          <p>2</p>
        </Property>
      </div>

      <div>share your asset</div>
    </div>
  </div>
</div>
{#if data.verifiedStatus}
  <div class="grid lg:grid-cols-2 gap-5 mt-8">
    <Card
      class="col !max-w-none bg-deep-green dark:bg-primary-500 border-none text-white"
      color="none"
    >
      <Subheader>Collecting Funds For</Subheader>
      <h2 class="text-5xl lg:text-6xl font-serif text-inherit">Morani</h2>
      <div class="aspect-square pb-2"><ModelViewer {modelUrl} /></div>
      <div class="aspect-square pb-2"><SimpleMap /></div>
      <h2 class="text-xl text-white pb-2">Info:</h2>
      <Property name="ID">
        <p>x150</p>
      </Property>
      <Property name="Zebras Spotted">
        <p>10</p>
      </Property>
      <Property name="Elephants Spotted">
        <p>100</p>
      </Property>
      <Property name="Rangers Patrolling">
        <p>1000</p>
      </Property>
    </Card>
    <div class="col grid gap-5">
      <Card class="w-100 !max-w-none bg-primary-100 " color="none">
        <Subheader>Funds Collected</Subheader>

        <Property name="By this item">
          <p>10 $</p>
        </Property>
        <Property name="By all copies of this item">
          <p>10000 $</p>
        </Property>
        <Property name="Total By Campaign">
          <p>1000 000 $</p>
        </Property>
      </Card>
      <Card
        color="none"
        class="border-none !max-w-none bg-primary-100 dark:bg-deep-green dark:text-white "
      >
        <Subheader>Campaign Info</Subheader>
        <h2 class="text-inherit text-3xl">{data.deepData?.steward?.name}</h2>
        <p>
          {data.deepData?.steward?.description}
        </p>
        <div class="aspect-square pb-2">
          {data.deepData?.steward?.area}
          <SimpleMap />
        </div>
        <div class="mt-5">
          {#each data.deepData?.steward?.images as image, index}
            <img
              class="pb-2 rounded-lg"
              src={`https://directus.sovereignnature.com/assets/${image.directus_files_id}`}
              alt={image.description}
            />
          {/each}
        </div>
      </Card>
    </div>
  </div>
{/if}
