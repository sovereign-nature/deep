<script lang="ts">
  // import LayoutLanding from '$lib/containers/LayoutLanding.svelte';

  import ShareCard from '$lib/components/ShareCard.svelte';

  import CollectionsTabs from '$lib/widgets/CollectionTabs/CollectionTabs.svelte';

  import { LL } from '$lib/shared/i18n/i18n-svelte';

  export let data;
</script>

<ShareCard />
<div class=" px-4 md:px-0 pb-8 lg:mt-[3vh]">
  <div class="w-full lg:w-4/5 mx-auto">
    <div
      class="dark:text-gray-50 mb-6 sm:mb-12 md:mb-20 md:text-left text-center"
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
        class="font-serif font-regular text-base md:text-[22px] block w-11/12 sm:w-9/12 mx-auto md:mx-0"
      >
        {$LL.subtitle()}
      </span>
    </div>
    <CollectionsTabs highlights={data.highlights} />
  </div>
</div>
