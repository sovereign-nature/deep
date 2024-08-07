<script lang="ts">
  import { TimelineItem } from 'flowbite-svelte';
  import TimelineIcon from './TimelineIcon.svelte';
  import HexagonGridIcon from '$lib/components/icons/HexagonGridIcon.svelte';
  import HexagonEggIcon from '$lib/components/icons/HexagonEggIcon.svelte';
  import HexagonMultiIcon from '$lib/components/icons/HexagonMultiIcon.svelte';
  export let itemState: 'complete' | 'active' | 'locked' = 'active';
  export let stepTitle: string | undefined;
  export let eggIcon = false;
  export let proofIcon = false;
  export let multiIcon = false;
</script>

<TimelineItem classLi="min-w-[250px] max-w-md lg:w-1/3" classDiv="hidden">
  <svelte:fragment slot="icon">
    <TimelineIcon {itemState} />
  </svelte:fragment>
  <div class="mx-6">
    <span class="text-sm text-gray-300 font-aeonik font-light mt-1 mb-6 block"
      >{stepTitle}</span
    >
    <slot name="featured"></slot>
    <div
      class="flex flex-col-reverse sm:flex-row lg:flex-col-reverse xl:flex-row items-strech sm:items-center justify-between gap-6"
    >
      <div
        class="sm:min-h-[65px] flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center w-full"
      >
        <slot name="header"></slot>
      </div>
      <div
        class="flex gap-3 self-start lg:self-center xl:self-auto my-4 sm:my-0 lg:my-4 xl:my-0"
      >
        {#if eggIcon}
          <HexagonEggIcon
            className="h-14 w-14 text-deep-green fill-primary-300"
          />
        {/if}
        {#if proofIcon}
          <HexagonGridIcon
            className="h-14 w-14 text-deep-green fill-primary-500"
          />
        {/if}
        {#if multiIcon}
          <HexagonMultiIcon
            className="h-14 w-14 text-deep-green fill-primary-500"
          />
        {/if}
      </div>
    </div>
    <slot name="content"></slot>
  </div>
</TimelineItem>
