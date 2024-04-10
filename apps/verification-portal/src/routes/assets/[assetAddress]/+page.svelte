<script setup lang="ts">
  import {
    ANIMAL_PLACEHOLDER,
    CAMP_PLACEHOLDER,
  } from '@sni/constants/cdn/placeholders';
  import { getChainName } from '@sni/address-utils';
  import Property from '$lib/shared/typography/Property.svelte';
  import Info from '$lib/shared/typography/Info.svelte';
  import Subheader from '$lib/shared/typography/Subheader.svelte';
  import CardHeader from '$lib/shared/typography/CardHeader.svelte';
  import NFTImage from '$lib/components/NFTImage.svelte';
  import ImageSrcSet from '$lib/components/ImageSrcSet.svelte';
  import SocialShare from '$lib/components/SocialShare.svelte';
  import FundsDashboard from '$lib/components/dashboard/FundsDashboard.svelte';
  import SimpleMap from '$lib/components/SimpleMap.svelte';
  import ShareCard from '$lib/components/ShareCard.svelte';
  import AudioPlayer from '$lib/components/media/AudioPlayer.svelte';
  import NewsCarousel from '$lib/components/carousel/NewsCarousel.svelte';
  import LL from '$lib/shared/i18n/i18n-svelte.js';
  import { subscribeToPage, setTocTitle } from '$lib/features/toc';
  import { onDestroy } from 'svelte';

  import { page } from '$app/stores';

  const unsubscribe = subscribeToPage(page);

  onDestroy(unsubscribe);

  $: currentPath = $page.url.toString();
  $: pageTitle = `${$LL.assets.title({ assetName: nftData.name })}`;

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
  const chainReference = addressDetails?.chain?.reference;
  setTocTitle(nftData.name);

  // Define specific share card data for a page
  $: pageDescription = nftData?.collection?.description || ''; //TODO: Check why we need collection description, should be asset description probably
  $: name = nftData.name || '';
  $: funds = deepData?.steward?.funds_raised || 0;
  $: source = isNaN(parseInt(chainReference))
    ? chainReference
    : getChainName(parseInt(chainReference));
  $: image = nftData.image;
  $: pageImagePath = `/og?title=${encodeURIComponent(
    name
  )}&funds=${encodeURIComponent(funds.toString())}&img=${encodeURIComponent(
    image
  )}&source=${encodeURIComponent(source)}`;
  $: pageImage = `${baseUrl}/${pageImagePath}`;
  $: pageImageSquare = `${pageImagePath}&ratio=square`;
  // styling
  const cardHeaderClass =
    'px-12 pt-6 sm:px-8 sm:pt-8 md:px-11 md:pt-11 whitespace-pre-line';
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
  class="mb-4 grid grid-cols-1 px-10 md:px-8 lg:mb-10 lg:grid-cols-12 lg:gap-5 lg:px-4 xl:mb-16 xl:px-16"
>
  <div
    class="w-100 relative z-10 col-span-1 mb-8 flex justify-center lg:col-span-4 lg:mb-4 xl:col-span-4 xl:col-start-1"
  >
    {#key nftData}
      <NFTImage
        verified={verifiedStatus}
        url={nftData.image}
        alt={nftData.name}
      />
    {/key}
  </div>
  <div class="lg:col-span-8 xl:col-span-8">
    <div>
      <h1
        class="mb-4 text-[22px] sm:text-2xl leading-none md:text-3xl lg:text-4xl"
      >
        {#if verifiedStatus}
          <span class="text-primary-300">{$LL.assets.verified()}</span>
        {/if}
        <span class="font-aeonik">
          {nftData.name}
        </span>
      </h1>
      <div class="mb-6">
        {#if nftData.description}
          <span class="block pt-2 text-base sm:text-sm">
            {nftData.description}</span
          >
        {/if}
      </div>
    </div>
    <div class="grid gap-x-1 gap-y-5 lg:grid-cols-5">
      <div class="col-span-3">
        <Property name="Source">
          <p>{source}</p>
        </Property>
        {#if nftData.tokenId}
          <Property name="Token ID">
            <p>{nftData.tokenId}</p>
          </Property>
        {/if}

        <Property name="Asset Address">
          <Info>{assetAddress}</Info>
        </Property>
      </div>

      <div
        class="col-span-2 flex flex-col gap-5 pb-4 lg:flex-row lg:items-center lg:pb-0"
      >
        <span class="text-sm">{$LL.assets.shareText()}</span>
        <SocialShare
          shareUrl={currentPath}
          shareImage={pageImageSquare}
          shareTitle={assetAddress}
        />
      </div>
    </div>
  </div>
</div>

<!-- /header -->

{#if verifiedStatus}
  <div
    class="container-grid grid grid-cols-1 sm:mx-4 lg:px-4 xl:mx-0 xl:grid-cols-3"
  >
    <!-- Fund Data -->
    <div
      class="Fund-Data xl:dark:bg-primary-100 xl:bg-primary-500 mb-5 px-12 sm:px-8 md:px-11 xl:rounded-lg xl:py-8 xl:pt-11 text-white"
    >
      <Subheader
        id="funds"
        title={$LL.assets.funds.cardTitle()}
        className="md:!text-base !font-normal  text-black dark:text-white   xl:text-white xl:dark:!text-black md:pt-8 xl:pt-0 flex justify-start lg:justify-center xl:justify-start "
        >{$LL.assets.funds.cardTitle()}</Subheader
      >
      <FundsDashboard
        totalFunds={deepData.steward?.funds_raised.toString()}
        totalFundsSubtitle={$LL.assets.funds.labelTotal()}
      ></FundsDashboard>
    </div>

    <!-- Animal Data -->
    <div
      class="asset-content-card Animal-Data min-h-100 text-white bg-deep-green dark:bg-primary-500 overflow-hidden sm:rounded-lg md:mb-4 xl:mb-0 xl:rounded-b-none mt-8 sm:mt-auto"
    >
      <div class={`${cardHeaderClass} mb-8`}>
        <Subheader
          id="entity"
          title={$LL.assets.ecEntity.cardTitle()}
          className="md:!text-base font-normal"
          >{$LL.assets.ecEntity.cardTitle()}</Subheader
        >
        <h3 class="text-6xl">{deepData?.id}</h3>
      </div>
      <div class="full">
        {#key deepData}
          {#if deepData.sound}
            <AudioPlayer
              assetID={deepData.sound?.id}
              file={deepData.sound?.filename_disk}
            ></AudioPlayer>
          {/if}
        {/key}
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
              src={ANIMAL_PLACEHOLDER}
              alt="Not Available"
            />
          {/if}
        {/key}
      </div>
    </div>

    <!-- Animal Data Map -->
    <div
      class="asset-content-card Animal-Data-Map sm:bg-deep-green sm:dark:bg-primary-500 md:border-t-none dark:border-deep-green relative z-20 overflow-hidden border-t-2 sm:rounded-lg xl:rounded-t-none xl:border-t-2"
    >
      <div class="aspect-video w-full">
        {#key deepData.location}
          <SimpleMap geoJSONData={deepData.location} />
        {/key}
      </div>
    </div>

    <!-- Animal Data Continued -->
    <div class="asset-content-card Animal-Data-Continued mb-5 bg-transparent">
      <div class={`${cardHeaderClass} mb-5`}>
        <Subheader id="ecological-entity" title={$LL.assets.ecEntity.title()}
          >{$LL.assets.ecEntity.title()}</Subheader
        >
        <CardHeader title={deepData.name ? deepData.name : 'Unnamed'} />
        <p class="card-description">
          {deepData.description ? deepData.description : '...'}
        </p>
      </div>
      {#key properties}
        {#if Object.keys(properties).length > 0 && Object.keys(properties.traces_recorded).length > 0}
          <div
            class="mx-4 sm:mx-6 rounded-lg bg-gray-300 p-11 dark:bg-black dark:text-gray-300"
          >
            <Subheader
              id="tracking-data"
              title={$LL.assets.ecEntity.propsTitle()}
              >{$LL.assets.ecEntity.propsTitle()}</Subheader
            >

            {#if Object.keys(properties.traces_recorded).length > 0}
              <div class="mb-2 font-serif text-[26px]">
                {$LL.assets.ecEntity.traces()}
              </div>
              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-y-2"
              >
                {#each Object.keys(properties.traces_recorded) as property}
                  {#if properties.traces_recorded[property] > 0}
                    <div
                      class="col-span-1 font-serif font-light text-2xl sm:text-base"
                    >
                      From {property}:
                      <span class="text-primary-400 dark:text-primary-300 ms-1"
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
      <div class="Steward-Data w-full">
        <!-- Steward News -->

        {#if deepData.news?.length > 0}
          <div
            class=" w-inherit relative z-20 overflow-hidden bg-gray-100 mb-5 rounded-lg dark:text-black mx-4 sm:mx-0 mt-8 sm:mt-auto"
          >
            <NewsCarousel newsData={deepData.news}></NewsCarousel>
          </div>
        {/if}
        <!-- Steward Data -->
        <div
          class="asset-content-card sm:bg-primary-100 sm:dark:bg-deep-green relative z-20 overflow-hidden sm:rounded-lg"
        >
          <div class={`${cardHeaderClass} mb-8`}>
            <Subheader id="steward" title={$LL.assets.ecSteward.title()}
              >{$LL.assets.ecSteward.title()}</Subheader
            >
            <CardHeader
              title={deepData.steward?.name}
              url={deepData.steward?.website}
            />
            <p class="card-description">
              {deepData.steward?.description}
            </p>
          </div>
          <div class="aspect-video w-full pt-8 sm:pt-auto">
            <SimpleMap geoJSONData={deepData?.steward?.area} />
          </div>
          <div class="flex w-full flex-col">
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
                src={CAMP_PLACEHOLDER}
                alt="Not Available"
              />
            {/if}
          </div>
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
  .Animal-Data-Continued {
    grid-area: Animal-Data-Continued;
    isolation: isolate;
    place-self: start;
  }

  .Steward-Data {
    grid-area: Steward-Data;
    isolation: isolate;
    position: relative;
    overflow: hidden;
  }
</style>
