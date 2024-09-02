<script lang="ts">
  import { state, proofStepState } from '$lib/widgets/DOTphin/MultipassStates';
  import Web3ConnectBtn from '$lib/widgets/ButtonWalletConnect/Web3ConnectBtn.svelte';
  import TimelineItem from '$lib/widgets/DOTphin/TimelineItem/TimelineItem.svelte';
  import CardTitle from '$lib/widgets/DOTphin/TimelineItem/Typography/Title.svelte';
  import CardSubtitle from '$lib/widgets/DOTphin/TimelineItem/Typography/Subtitle.svelte';
  import WrapTranslation from '$lib/shared/components/WrapTranslation.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  export let collection = 'DOTphin';
  export let collectionLink = '/#collections';

  //set states to show collection link
  $: hasCollectionLink =
    $proofStepState === 'HAS_AVAILABLE_PROOFS' ||
    $proofStepState === 'NO_AVAILABLE_PROOFS';

  $: title = (() => {
    switch ($proofStepState) {
      case 'NO_PROOFS':
        return $LL.multipass.state.proofStep.NO_PROOFS.title({ collection });
      case 'NO_AVAILABLE_PROOFS':
        return $LL.multipass.state.proofStep.NO_AVAILABLE_PROOFS.title({
          collection,
        });
      default:
        return '';
    }
  })();
  $: subtitle = (() => {
    switch ($proofStepState) {
      case 'NO_PROOFS':
        return $LL.multipass.state.proofStep.NO_PROOFS.subtitle();
      default:
        return $LL.multipass.state.proofStep.HAS_AVAILABLE_PROOFS.subtitle({
          collection,
          count: $state.proofs.proofCount,
        });
    }
  })();
</script>

{#if $proofStepState === 'LOGGED_OUT'}
  <TimelineItem
    itemState={$state.proofs.status}
    stepTitle={$LL.multipass.state.proofStep.stepTitle()}
    proofIcon
  >
    <svelte:fragment slot="header">
      <div class="flex flex-row justify-start md:justify-center">
        <Web3ConnectBtn alwaysOpen />
      </div>
    </svelte:fragment>

    <svelte:fragment slot="content">
      <CardSubtitle
        content={$LL.multipass.state.proofStep.LOGGED_OUT.subtitle()}
      />
    </svelte:fragment>
  </TimelineItem>
{:else}
  <TimelineItem
    itemState={$state.proofs.status}
    stepTitle={$LL.multipass.state.proofStep.stepTitle()}
    proofIcon
  >
    <svelte:fragment slot="header">
      {#if $proofStepState === 'HAS_AVAILABLE_PROOFS'}
        <CardTitle>
          <WrapTranslation
            message={$LL.multipass.state.proofStep.HAS_AVAILABLE_PROOFS.title({
              count: $state.proofs.availableProofCount,
            })}
            let:infix
          >
            <span class="text-primary-200 text-2xl whitespace-nowrap"
              >{infix}</span
            >
          </WrapTranslation>
        </CardTitle>
      {:else}
        <CardTitle content={title} />
      {/if}
    </svelte:fragment>

    <svelte:fragment slot="content">
      <CardSubtitle content={subtitle} />

      {#if $proofStepState === 'NO_PROOFS'}
        <button
          type="button"
          disabled
          class="px-4 py-3 rounded-full whitespace-nowrap disabled:cursor-not-allowed drop-shadow-sm text-primary-200 bg-deep-blue font-aeonik text-sm"
        >
          {$LL.multipass.state.proofStep.NO_PROOFS.cta()}
        </button>
      {/if}
      {#if hasCollectionLink && collectionLink}
        <a href={collectionLink} class="text-xs text-primary">
          {$LL.multipass.state.proofStep.HAS_AVAILABLE_PROOFS.moreInfo()}
        </a>
      {/if}
    </svelte:fragment>
  </TimelineItem>
{/if}
