<script lang="ts">
  import { state, proofStepState } from '$lib/widgets/DOTphin/MultipassStates';
  import Web3ConnectBtn from '$lib/widgets/ButtonWalletConnect/Web3ConnectBtn.svelte';
  import TimelineItem from '$lib/widgets/DOTphin/TimelineItem/TimelineItem.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
</script>

<TimelineItem
  itemState={$state.proofs.status}
  stepTitle="Attendance Proofs"
  proofIcon
>
  <svelte:fragment slot="header">
    {#if $proofStepState === 'LOGGED_OUT'}
      <h3 class="text-xl">Log-in to check your proofs</h3>
    {:else if $proofStepState === 'NO_PROOFS'}
      <h3 class="text-xl">You have no proofs</h3>
    {:else}
      <h3 class="text-xl">
        Available proofs {$state.proofs.availableProofCount} of {$state.proofs
          .proofCount}
      </h3>
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="my-4 flex items-start flex-wrap gap-3">
      {#if $proofStepState === 'LOGGED_OUT'}
        <Web3ConnectBtn alwaysOpen />
      {:else if $proofStepState === 'NO_PROOFS'}
        <p
          class=" text-sm font-normal text-gray-500 dark:text-gray-400 block w-full"
        >
          {$LL.multipass.state.noProof.content()}
        </p>
        <button
          type="button"
          disabled
          class="px-4 py-3 rounded-full whitespace-nowrap disabled:cursor-not-allowed drop-shadow-sm text-primary-200 bg-deep-blue font-aeonik text-sm"
          >How to get proofs?</button
        >
      {:else}
        <a href="/#collections" class="text-xs text-primary"
          >See all your proofs</a
        >
      {/if}
    </div>
  </svelte:fragment>
</TimelineItem>
