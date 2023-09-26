<script setup lang="ts">
  import Property from '$lib/typography/Property.svelte';
  import Subheader from '$lib/typography/Subheader.svelte';
  import IPFSimage from '$lib/components/IPFSimage.svelte';
  import ImageSrcSet from '$lib/components/ImageSrcSet.svelte';
  import SocialShare from '$lib/components/SocialShare.svelte';
  import FundsDashboard from '$lib/components/FundsDashboard.svelte';
  import SimpleMap from '$lib/components/SimpleMap.svelte';

  import { page } from '$app/stores';

  import placeholderAnimal from '$lib/assets/images/placeholderAnimal.jpg';
  import placeholderCamp from '$lib/assets/images/placeholderCamp.jpg';

  $: currentPath = $page.url.toString();

  const content = {
    intro:
      'Welcome to the Polkadot sub0 biodiversity collection. Your contribution makes a REAL difference. Connect with the marine biodiversity served by the organisation AIMM Portugal.',
    shareText: 'Share your asset',
    page: {
      funds: {
        cardTitle: 'Funds generated so far:',
      },
      ecSteward: {
        title: 'Ecological Steward',
        description:
          'Ecological Steward (ES): an identified conservation/restoration group, being an organisation (e.g. KWT) or a community, group of stakeholders who has also the mandate to manage the funds raised',
      },
      ecEntity: {
        cardTitle: 'Collecting funds for:',
        title: 'Ecological Entity',
        description:
          'Ecological Entity: an identified piece of ecology the Ecological Steward (ES) focuses on, that being a specific species population (predators of the Maasai Mara) or an ecosystem (the Upemba National Park)',
      },
    },
  };

  export let data;
</script>

<!-- Header -->
<div
  class="grid grid-cols-1 lg:grid-cols-12 lg:gap-5 mb-4 xl:mb-16 px-4 md:px-8 xl:px-0"
>
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
        <span class="font-aeonik">
          {data.nftData.meta?.name}
        </span>
      </h1>
      {#if data.nftData.meta?.description}
        <p class=" text-sm mb-6">
          <!-- {data.nftData.meta?.description} -->
          {content.intro}
        </p>
      {/if}
    </div>
    <div class="grid lg:grid-cols-2 gap-5">
      <div>
        <Property name="Source">
          <p>sub0</p>
        </Property>
        <Property name="Token ID">
          <p>{data.nftData.sn}</p>
        </Property>
        <Property name="Asset Address">
          <p>{data.assetAddress}</p>
        </Property>
      </div>

      <div>
        <span class="text-sm">{content.shareText}</span>
        <SocialShare shareUrl={currentPath} />
      </div>
    </div>
  </div>
</div>

<!-- /header -->

{#if data.verifiedStatus}
  <div
    class="container-grid text-white md:mx-4 xl:mx-0 grid grid-cols-1 gap-4 md:gap-8 xl:grid-cols-3"
  >
    <!-- Fund Data -->
    <div
      class="Fund-Data mb-8 px-4 md:px-8 xl:dark:bg-primary-100 xl:bg-primary-500 xl:rounded-xl xl:py-8"
    >
      <Subheader
        className="!text-base text-black dark:text-white xl:!text-black md:pt-8 xl:pt-0 flex justify-start md:justify-center xl:justify-start "
        >{content.page.funds.cardTitle}</Subheader
      >
      <FundsDashboard totalFunds={data.deepData.steward?.funds_raised}
      ></FundsDashboard>
    </div>

    <!-- Animal Data -->
    <div
      class="Animal-Data md:mb-4 xl:mb-0 min-h-100 bg-deep-green dark:bg-primary-500 md:rounded-xl xl:rounded-b-none text-white overflow-hidden"
    >
      <div class="px-4 md:px-8 pt-8 mb-8">
        <Subheader className="!text-base"
          >{content.page.ecEntity.cardTitle}</Subheader
        >
        <h3 class="text-5xl">{data.deepData?.id}</h3>
        <p>{data.deepData?.description}</p>
      </div>
      <div class="w-full flex flex-col gap-1 mb-1 md:mb-0 xl:mb-1">
        {#if data.deepData?.images?.length > 0}
          {#each data.deepData?.images as image}
            <ImageSrcSet
              assetID={image.directus_files_id}
              altText={data.deepData?.id}
            />
          {/each}
        {:else}
          <img
            style="width:inherit"
            src={placeholderAnimal}
            alt="Not Available"
          />
        {/if}
      </div>
    </div>

    <!-- Animal Data Map -->
    <div
      class="Animal-Data-Map bg-deep-green dark:bg-primary-50 text-white md:rounded-xl xl:rounded-t-none overflow-hidden relative z-20"
    >
      <div class="w-full aspect-video">
        <SimpleMap geoJSONData={data.deepData?.location} />
      </div>
    </div>

    <!-- Animal Data Continued -->
    <div
      class="Animal-Data-Continued bg-transparent px-4 md:px-8 py-16 text-black dark:text-white"
    >
      <Subheader info={content.page?.ecEntity?.description}
        >{content.page?.ecEntity?.title}</Subheader
      >
      <h3 class="text-2xl">Lorem Ipsum</h3>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
        corrupti natus reiciendis quo nam ipsam, animi repellat ullam
        perspiciatis? Hic amet adipisci voluptatum maxime repudiandae iusto quia
        eveniet similique officiis.
      </p>
    </div>

    <!-- Steward Data -->
    <div
      class="Steward-Data bg-primary-100 dark:bg-deep-green text-black dark:text-white md:rounded-xl overflow-hidden"
    >
      <div class="px-4 md:px-8 pt-8 pb-8">
        <Subheader info={content.page?.ecSteward?.description}
          >{content.page?.ecSteward?.title}</Subheader
        >
        <h3 class="text-2xl">{data.deepData?.steward?.name}</h3>
        <p>
          {data.deepData?.steward?.description}
        </p>
      </div>
      <div class="w-full aspect-video mb-1">
        <SimpleMap geoJSONData={data.deepData?.steward?.area} />
      </div>
      <div class="w-full flex flex-col gap-1">
        {#if data.deepData?.steward?.images?.length > 0}
          {#each data.deepData?.steward?.images as image}
            <ImageSrcSet
              assetID={image.directus_files_id}
              altText={data.deepData?.steward?.name}
            />
          {/each}
        {:else}
          <img
            style="width:inherit"
            src={placeholderCamp}
            alt="Not Available"
          />
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .container-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0em 2em;
    grid-auto-flow: row;
  }
  .container-grid {
    grid-template-columns: 1fr;
    grid-template-rows: min-content max-content max-content max-content max-content;
    grid-template-areas:
      'Fund-Data'
      'Animal-Data'
      'Animal-Data-Map'
      'Animal-Data-Continued'
      'Steward-Data';
  }
  @media (min-width: 1024px) {
    .container-grid {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: min-content min-content min-content min-content 1fr;
      grid-template-areas:
        'Animal-Data Animal-Data Fund-Data'
        'Animal-Data Animal-Data Fund-Data'
        'Animal-Data-Map Animal-Data-Map Animal-Data-Map'
        'Animal-Data-Continued Animal-Data-Continued Animal-Data-Continued'
        'Steward-Data Steward-Data Steward-Data';
    }
  }

  @media (min-width: 1280px) {
    .container-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: min-content min-content min-content 1fr;
      grid-template-areas:
        'Animal-Data Fund-Data'
        'Animal-Data Steward-Data'
        'Animal-Data-Map Steward-Data'
        'Animal-Data-Continued Steward-Data';
    }
  }

  .Fund-Data {
    grid-area: Fund-Data;
  }

  .Animal-Data {
    grid-area: Animal-Data;
  }
  .Animal-Data-Map {
    grid-area: Animal-Data-Map;
  }

  .Steward-Data {
    grid-area: Steward-Data;
  }

  .Animal-Data-Continued {
    grid-area: Animal-Data-Continued;
  }
</style>
