<script lang="ts">
  import { state, evolveStepState } from '$lib/widgets/DOTphin/MultipassStates';
  import TimelineItem from '$lib/widgets/DOTphin/TimelineItem/TimelineItem.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
</script>

<TimelineItem itemState={$state.evolution.status} stepTitle="Evolve" multiIcon>
  <svelte:fragment slot="header">
    <button
      type="button"
      disabled
      class="px-4 py-2 rounded-full whitespace-nowrap disabled:cursor-not-allowed drop-shadow-sm text-deep-green bg-gray-300 font-aeonik text-base"
      >Evolve the Egg</button
    >
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="my-4 flex items-start flex-wrap gap-3">
      <p
        class=" text-sm font-normal text-gray-500 dark:text-gray-400 block w-full"
      >
        {$LL.multipass.state.evolve.complete}
        {$evolveStepState}
      </p>
      <a href="https://sovereignnature.com/dotphin" class="text-xs text-primary"
        >Read more</a
      >
    </div>
  </svelte:fragment>
</TimelineItem>
