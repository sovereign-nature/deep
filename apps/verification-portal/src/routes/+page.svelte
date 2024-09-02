<script lang="ts">
  // import LayoutLanding from '$lib/containers/LayoutLanding.svelte';

  import ShareCard from '$lib/components/ShareCard.svelte';
  import FeaturedContainer from '$lib/entities/featured/FeaturedContainer.svelte';
  import CollectionsTabs from '$lib/widgets/CollectionTabs/CollectionTabs.svelte';

  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import DoTphinTimelineWrapper from '$lib/widgets/DOTphin/TimelineWrapper.svelte';

  export let data;
</script>

<ShareCard />
<div class="  pb-8 lg:mt-[3vh]">
  <div class="w-full lg:w-4/5 mx-auto">
    <div
      class="dark:text-gray-200 mb-6 sm:mb-12 md:mb-20 md:text-left text-center px-4 lg:px-0"
    >
      <h1
        data-testid="title"
        class="text-[37px] lg:text-[45px] font-regular mb-2 lg:mb-4 leading-none"
      >
        <span class="block sm:inline"> {$LL.title.part1()}</span>

        <span
          class="font-aeonik font-bold text-primary-300 dark:text-primary-200"
        >
          {$LL.title.part2()}
        </span>
        {$LL.title.part3()}
      </h1>

      <span
        data-testid="subtitle"
        class="font-serif font-regular text-base md:text-[22px] block xl:w-11/12 sm:w-9/12 mx-auto md:mx-0"
      >
        {$LL.subtitle()}
      </span>
      <a
        href="/#collections"
        class=" text-primary-300 font-aeonik font-regular text-base md:text-[18px] block xl:w-11/12 sm:w-9/12 mx-auto md:mx-0"
        >See all collections</a
      >
    </div>
    <DoTphinTimelineWrapper />
    <div id="collections" class="px-4 md:px-2 lg:px-0">
      <CollectionsTabs>
        {#await data.streamed.highlights then highlights}
          <FeaturedContainer
            collectionName={$LL[data.collectionKey].collectionName()}
            featuredItems={highlights}
          />
        {/await}
      </CollectionsTabs>
    </div>
  </div>
</div>
