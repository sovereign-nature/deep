<script lang="ts">
  import LayoutLanding from '$lib/containers/LayoutLanding.svelte';

  import ShareCard from '$lib/components/ShareCard.svelte';

  import SearchTabs from '$lib/containers/SearchTabs.svelte';

  import { LL } from '$lib/i18n/i18n-svelte';

  export let data;
</script>

<ShareCard />

<LayoutLanding>
  <div
    class="dark:text-gray-50 mb-6 sm:mb-12 md:mb-20 md:text-left text-center"
  >
    <h1
      data-testid="title"
      class="text-2xl sm:text-3xl lg:text-[45px] font-regular lg:mb-4"
    >
      {$LL.title.part1()}
      <span
        class="font-aeonik font-bold text-primary-300 dark:text-primary-200"
      >
        {$LL.title.part2()}
      </span>
      {$LL.title.part3()}
    </h1>

    <span data-testid="subtitle" class="font-serif text-sm md:text-[22px]">
      {$LL.subtitle()}
    </span>
  </div>

  <SearchTabs highlights={data.highlights} />
</LayoutLanding>
