<script setup lang="ts">
  import Property from '$lib/typography/Property.svelte';
  import Info from '$lib/typography/Info.svelte';
  import Subheader from '$lib/typography/Subheader.svelte';
  import CardHeader from '$lib/typography/CardHeader.svelte';
  import NFTImage from '$lib/components/NFTImage.svelte';
  import ImageSrcSet from '$lib/components/ImageSrcSet.svelte';
  import SocialShare from '$lib/components/SocialShare.svelte';
  import FundsDashboard from '$lib/components/dashboard/FundsDashboard.svelte';
  import SimpleMap from '$lib/components/SimpleMap.svelte';
  import ShareCard from '$lib/components/ShareCard.svelte';
  import type { CollectionKey } from '$lib/types';

  import { page } from '$app/stores';

  import placeholderAnimal from '$lib/assets/images/placeholderAnimal.jpg';
  import placeholderCamp from '$lib/assets/images/placeholderCamp.jpg';

  $: currentPath = $page.url.toString();
  $: pageTitle = `REAL by SNI | ${nftData.name}`;

  export let data;
  const {
    nftData,
    verifiedStatus,
    deepData,
    baseUrl,
    assetAddress,
    addressDetails,
    properties,
  } = data;

  const isSub0 = addressDetails?.chain?.reference == 'polkadot';

  const introText = isSub0
    ? 'Welcome to the Polkadot sub0 biodiversity collection. Your contribution makes a REAL difference. Connect with the marine biodiversity served by the organisation AIMM Portugal.'
    : nftData?.collection?.description;

  const content = {
    intro: introText,
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
        propsTitle: 'Animal stats:',
        title: 'Ecological Entity',
        description:
          'Ecological Entity: an identified piece of ecology the Ecological Steward (ES) focuses on, that being a specific species population (predators of the Maasai Mara) or an ecosystem (the Upemba National Park)',
      },
    },
  };

  // Define specific share card data for a page
  $: pageDescription = `${content.intro}`;
  $: name = nftData.name || '';
  $: funds = deepData?.link?.funds_raised || 0;
  $: source = isSub0 ? 'sub0' : 'Hotel Hideaway'; // @TODO replace with dynamic source
  $: image = nftData.image;
  $: pageImage = `${baseUrl}/og?title=${encodeURIComponent(
    name
  )}&funds=${encodeURIComponent(funds.toString())}&img=${encodeURIComponent(
    image
  )}&source=${encodeURIComponent(source)}`;
  // styling
  const cardHeaderClass = 'px-4 pt-6 sm:px-8 sm:pt-8 md:px-11 md:pt-11';
  const collectionId: CollectionKey = isSub0 ? 'sub0' : 'hh';
</script>

{#key nftData}
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
    {#key nftData}
      <NFTImage
        verified={verifiedStatus}
        url={nftData.image}
        alt={nftData.name}
      />
    {/key}
  </div>
  <div class="lg:col-span-8 xl:col-span-8 dark:text-white">
    <div>
      <h1
        class="dark:text-white text-2xl md:text-3xl lg:text-4xl leading-tight mb-6"
      >
        {#if verifiedStatus}
          <span class="text-primary-300">Verified:</span>
        {/if}
        <span class="font-aeonik">
          {nftData.name}
        </span>
      </h1>
      <div class="mb-6">
        {#if verifiedStatus}
          <p>{content.intro}</p>
        {/if}

        {#if nftData.description}
          <span class="text-sm block pt-2"> {nftData.description}</span>
        {/if}
      </div>
    </div>
    <div class="grid lg:grid-cols-5 gap-x-1 gap-y-5">
      <div class="col-span-3">
        <Property name="Source">
          <p>{source}</p>
        </Property>
        {#if nftData.tokenId}
          <Property name="Token ID">
            <p>{nftData.tokenId}</p>
          </Property>
        {/if}
        {#if isSub0}
          <Property name="Asset Address">
            <p>{assetAddress}</p>
          </Property>
        {:else}
          <Property name="Asset Address">
            <Info>{assetAddress}</Info>
          </Property>
        {/if}
      </div>

      <div
        class="col-span-2 flex flex-col lg:flex-row lg:items-center gap-5 pb-4 lg:pb-0"
      >
        <span class="text-sm">{content.shareText}</span>
        <SocialShare shareUrl={currentPath} collection={collectionId} />
      </div>
    </div>
  </div>
</div>

<!-- /header -->

{#if verifiedStatus}
  <div
    class="container-grid text-white md:mx-4 xl:mx-0 grid grid-cols-1 xl:grid-cols-3"
  >
    <!-- Fund Data -->
    <div
      class="Fund-Data mb-5 px-4 sm:px-8 md:px-11 xl:pt-11 xl:dark:bg-primary-100 xl:bg-primary-500 xl:rounded-lg xl:py-8"
    >
      <Subheader
        className="!text-base font-normal text-black dark:text-white xl:text-white xl:dark:!text-black md:pt-8 xl:pt-0 flex justify-start lg:justify-center xl:justify-start "
        >{content.page.funds.cardTitle}</Subheader
      >
      <FundsDashboard
        totalFunds={deepData.steward?.funds_raised.toString()}
        assetFunds={deepData.link?.funds_raised.toString()}
      ></FundsDashboard>
    </div>

    <!-- Animal Data -->
    <div
      class="Animal-Data md:mb-4 xl:mb-0 min-h-100 bg-deep-green dark:bg-primary-500 sm:rounded-lg xl:rounded-b-none text-white overflow-hidden"
    >
      <div class={`${cardHeaderClass} mb-8`}>
        <Subheader className="!text-base font-normal"
          >{content.page.ecEntity.cardTitle}</Subheader
        >
        <h3 class="text-5xl">{deepData?.id}</h3>
      </div>
      <div class="w-full">
        {#key deepData}
          {#if deepData.images?.length > 0}
            {#each deepData?.images as image, index}
              <ImageSrcSet
                classNameImage={index > 0
                  ? 'border-t-2 dark:border-deep-green '
                  : ''}
                assetID={image.directus_files_id}
                altText={deepData?.id}
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
      class="Animal-Data-Map bg-deep-green dark:bg-primary-500 text-white sm:rounded-lg xl:rounded-t-none overflow-hidden relative z-20 border-t-2 md:border-t-none xl:border-t-2 dark:border-deep-green"
    >
      <div class="w-full aspect-video">
        {#key deepData.location}
          <SimpleMap geoJSONData={deepData.location} />
        {/key}
      </div>
    </div>

    <!-- Animal Data Continued -->
    <div
      class="Animal-Data-Continued bg-transparent text-black dark:text-white mb-5"
    >
      <div class={`${cardHeaderClass} mb-5`}>
        <Subheader>{content.page?.ecEntity?.title}</Subheader>
        <CardHeader title={deepData?.name} />
        <p class="card-description">{deepData.description}</p>
      </div>
      {#key properties}
        {#if Object.keys(properties).length > 0 && Object.keys(properties.traces_recorded).length > 0}
          <div
            class="p-11 bg-gray-300 dark:bg-black rounded-lg mx-6 dark:text-gray-300"
          >
            <Subheader>{content.page.ecEntity.propsTitle}</Subheader>

            {#if Object.keys(properties.traces_recorded).length > 0}
              <div class="font-serif text-[22px] mb-2">Traces Recorded</div>
              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2"
              >
                {#each Object.keys(properties.traces_recorded) as property}
                  {#if properties.traces_recorded[property] > 0}
                    <div class="font-serif font-light col-span-1">
                      From {property}:
                      <span class="text-primary-400 dark:text-primary-300"
                        >{properties.traces_recorded[property]}</span
                      >
                    </div>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>
        {/if}
      {/key}
    </div>
    {#key deepData.steward}
      <!-- Steward Data -->
      <div
        class="Steward-Data bg-primary-100 dark:bg-deep-green text-black dark:text-white sm:rounded-lg overflow-hidden"
      >
        <div class={`${cardHeaderClass} mb-8`}>
          <Subheader>{content.page?.ecSteward?.title}</Subheader>
          <CardHeader
            title={deepData.steward?.name}
            url={deepData.steward?.website}
          />
          <p class="card-description">
            {deepData.steward?.description}
          </p>
        </div>
        <div class="w-full aspect-video">
          <SimpleMap geoJSONData={deepData?.steward?.area} />
        </div>
        <div class="w-full flex flex-col">
          {#if deepData.steward?.images?.length > 0}
            {#each deepData.steward?.images as image}
              <ImageSrcSet
                classNameImage="border-t-2 dark:border-deep-green"
                assetID={image.directus_files_id}
                altText={deepData?.steward?.name}
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
    {/key}
  </div>
{/if}

<style>
  .card-description {
    line-height: 28px;
  }
  .container-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0em 1.25em;
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
