<script setup lang="ts">
  import Property from '$lib/typography/Property.svelte';
  import Subheader from '$lib/typography/Subheader.svelte';
  import { getBaseUrl } from '$lib/utils.js';
  import IPFSimage from '$lib/components/IPFSimage.svelte';
  import ImageSrcSet from '$lib/components/ImageSrcSet.svelte';
  import SocialShare from '$lib/components/SocialShare.svelte';
  import FundsDashboard from '$lib/components/dashboard/FundsDashboard.svelte';
  import SimpleMap from '$lib/components/SimpleMap.svelte';
  import ShareCard from '$lib/components/ShareCard.svelte';

  import { page } from '$app/stores';

  import placeholderAnimal from '$lib/assets/images/placeholderAnimal.jpg';
  import placeholderCamp from '$lib/assets/images/placeholderCamp.jpg';

  $: currentPath = $page.url.toString();
  const baseUrl = getBaseUrl($page); //@TODO preferably replace with  Vercel env var

  $: pageTitle = `REAL by SNI | ${data.nftData.name}`;

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
        url: 'https://www.aimmportugal.org/',
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

  // Define specific share card data for a page
  $: pageDescription = `${content.intro}`;
  $: name = data.nftData.name || '';
  $: funds = data.deepData?.link?.funds_raised || 0;
  $: tokenID = data.nftData.id || '';
  $: source = ''; // @TODO replace with source
  $: image = ''; // @TODO replace with image path
  $: pageImage = `${baseUrl}/og?title=${encodeURIComponent(
    name
  )}&funds=${encodeURIComponent(funds.toString())}&tokenId=${encodeURIComponent(
    tokenID
  )}&image=${encodeURIComponent(image)}&source=${encodeURIComponent(source)}`;
</script>

{#key data}
  <ShareCard
    title={pageTitle}
    description={pageDescription}
    image={pageImage}
  />
{/key}

<!-- Header -->
<div
  class="grid grid-cols-1 lg:grid-cols-12 lg:gap-5 mb-4 lg:mb-10 xl:mb-16 px-4 lg:px-4 xl:px-16"
>
  <div
    class="col-span-1 lg:col-span-4 xl:col-start-1 xl:col-span-4 flex justify-center w-100 mb-8 lg:mb-4 relative z-10"
  >
    {#key data}
      <IPFSimage
        verified={data.verifiedStatus}
        ipfsImageUrl={data.nftData.image}
        alt={data.nftData.name}
      />
    {/key}
  </div>
  <div class="lg:col-span-8 xl:col-span-8 dark:text-white">
    <div>
      <h1
        class="dark:text-white text-2xl md:text-3xl lg:text-4xl leading-tight mb-6"
      >
        {#if data.verifiedStatus}
          <span class="text-primary-300">Verified:</span>
        {/if}
        <span class="font-aeonik">
          {data.nftData.name}
        </span>
      </h1>
      <div class="mb-6">
        {#if data.verifiedStatus}
          <p>{content.intro}</p>
        {/if}

        {#if data.nftData.description}
          <span class="text-sm block pt-2"> {data.nftData.description}</span>
        {/if}
      </div>
    </div>
    <div class="grid lg:grid-cols-6 gap-x-1 gap-y-5">
      <div class="col-span-4">
        <Property name="Source">
          <p>sub0</p>
        </Property>
        <Property name="Token ID">
          <p>{data.nftData.tokenId}</p>
        </Property>
        <Property name="Asset Address">
          <p>{data.assetAddress}</p>
        </Property>
      </div>

      <div class="col-span-2">
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
        className="!text-base text-black dark:text-white xl:text-white xl:dark:!text-black md:pt-8 xl:pt-0 flex justify-start lg:justify-center xl:justify-start "
        >{content.page.funds.cardTitle}</Subheader
      >
      <FundsDashboard
        totalFunds={data.deepData?.steward?.funds_raised.toString()}
        assetFunds={data.deepData?.link?.funds_raised.toString()}
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
      </div>
      <div class="w-full">
        {#key data.deepData}
          {#if data.deepData?.images?.length > 0}
            {#each data.deepData?.images as image, index}
              <ImageSrcSet
                classNameImage={index > 0
                  ? 'border-t-2 dark:border-deep-green '
                  : ''}
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
        {/key}
      </div>
    </div>

    <!-- Animal Data Map -->
    <div
      class="Animal-Data-Map bg-deep-green dark:bg-primary-500 text-white md:rounded-xl xl:rounded-t-none overflow-hidden relative z-20 border-t-2 md:border-t-none xl:border-t-2 dark:border-deep-green"
    >
      <div class="w-full aspect-video">
        {#key data.deepData}
          <SimpleMap geoJSONData={data.deepData?.location} />
        {/key}
      </div>
    </div>

    <!-- Animal Data Continued -->
    <div
      class="Animal-Data-Continued bg-transparent px-4 md:px-8 py-16 text-black dark:text-white"
    >
      <!-- <Subheader info={content.page?.ecEntity?.description}
        >{content.page?.ecEntity?.title}</Subheader
      > -->
      <!-- TODO: Restore info after text fix -->
      <Subheader>{content.page?.ecEntity?.title}</Subheader>
      <h3 class="text-2xl mb-3">{data.deepData?.name}</h3>

      <p class="card-description">{data.deepData?.description}</p>
    </div>

    <!-- Steward Data -->
    <div
      class="Steward-Data bg-primary-100 dark:bg-deep-green text-black dark:text-white md:rounded-xl overflow-hidden"
    >
      <div class="px-4 md:px-8 pt-8 pb-8">
        <Subheader
          info={`Visit ${data.deepData?.steward?.name}`}
          url={content.page?.ecSteward?.url}
          >{content.page?.ecSteward?.title}</Subheader
        >
        <h3 class="text-2xl mb-3">{data.deepData?.steward?.name}</h3>
        <p class="card-description">
          {data.deepData?.steward?.description}
        </p>
      </div>
      <div class="w-full aspect-video">
        <SimpleMap geoJSONData={data.deepData?.steward?.area} />
      </div>
      <div class="w-full flex flex-col">
        {#if data.deepData?.steward?.images?.length > 0}
          {#each data.deepData?.steward?.images as image}
            <ImageSrcSet
              classNameImage="border-t-2 dark:border-deep-green"
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
  .card-description {
    line-height: 28px;
  }
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
      place-content: start;
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
    isolation: isolate;
  }
  .Animal-Data-Map {
    grid-area: Animal-Data-Map;
    isolation: isolate;
  }

  .Steward-Data {
    grid-area: Steward-Data;
    isolation: isolate;
    place-self: start;
  }

  .Animal-Data-Continued {
    grid-area: Animal-Data-Continued;
    place-self: start;
    min-height: 12rem;
  }
</style>
