<script lang="ts">
  import { state } from '../MultipassStates';
  import TimelineItem from '../TimelineItem/TimelineItem.svelte';
</script>

<TimelineItem itemState={$state.evolution.status} stepTitle="Evolve" multiIcon>
  <svelte:fragment slot="header">
    <h3 class="text-xl">Evolve</h3>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="my-4 flex items-start flex-wrap gap-3">
      <p
        class=" text-sm font-normal text-gray-500 dark:text-gray-400 block w-full"
      >
        evolve
      </p>
      <div>
        <h2>Evolution Card</h2>
        <p>Status: {$state.evolution.status}</p>
        <p>Evolution Level: {$state.evolution.level}</p>
      </div>
    </div>
  </svelte:fragment>
</TimelineItem>
