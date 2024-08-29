<script lang="ts">
  import { state } from '../MultipassStates';
  import TimelineItem from '../TimelineItem/TimelineItem.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
</script>

<TimelineItem
  itemState={$state.proofs.status}
  stepTitle="Attendance Proofs"
  proofIcon
>
  <svelte:fragment slot="header">
    <h3 class="text-xl">
      {$LL.multipass.state.noProof.title({ collection: 'DOTphin' })}
    </h3>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="my-4 flex items-start flex-wrap gap-3">
      <p
        class=" text-sm font-normal text-gray-500 dark:text-gray-400 block w-full"
      >
        {$LL.multipass.state.noProof.content()}
      </p>
      <div>
        <p>Status: {$state.proofs.status}</p>
        <p>Proof Count: {$state.proofs.proofCount}</p>
        <p>Unused Proof Count: {$state.proofs.unusedProofCount}</p>
      </div>
      <button
        type="button"
        disabled
        class="px-4 py-3 rounded-full whitespace-nowrap disabled:cursor-not-allowed drop-shadow-sm text-primary-200 bg-deep-blue font-aeonik text-sm"
        >How to get proofs?</button
      >
    </div>
  </svelte:fragment>
</TimelineItem>
