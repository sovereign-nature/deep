<script lang="ts">
  import {
    multipassStepConfig,
    multipassData,
    proofStepState,
    isLoading,
  } from '$lib/features/MultipassStates';
  import siteConfigs from '$lib/shared/siteConfigs';
  import Web3ConnectBtn from '$lib/widgets/ButtonWalletConnect/Web3ConnectBtn.svelte';
  import TimelineItem from '$lib/widgets/DOTphin/TimelineItem/TimelineItem.svelte';
  import CardTitle from '$lib/widgets/DOTphin/TimelineItem/Typography/Title.svelte';
  import CardSubtitle from '$lib/widgets/DOTphin/TimelineItem/Typography/Subtitle.svelte';
  import WrapTranslation from '$lib/shared/components/WrapTranslation.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  export let collection = 'DOTphin';
  export let collectionLink = '/#collections';
  const cardLink =
    siteConfigs?.contentLinks?.DOTphin?.upcomingEvents ||
    siteConfigs?.contentLinks?.DOTphin?.default ||
    '';

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
          count: $multipassData.proofStats.total,
        });
    }
  })();
</script>

{#if $proofStepState === 'LOGGED_OUT'}
  <TimelineItem
    itemState={$multipassStepConfig.proofs.stepStatus}
    stepTitle={$LL.multipass.state.proofStep.stepTitle()}
    proofIcon
    isLoading={$isLoading}
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
    itemState={$multipassStepConfig.proofs.stepStatus}
    stepTitle={$LL.multipass.state.proofStep.stepTitle()}
    proofIcon
    isLoading={$isLoading}
  >
    <svelte:fragment slot="header">
      {#if $proofStepState === 'HAS_AVAILABLE_PROOFS'}
        <CardTitle>
          <WrapTranslation
            message={$LL.multipass.state.proofStep.HAS_AVAILABLE_PROOFS.title({
              count: $multipassData.proofStats.available.total,
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
      <CardSubtitle content={subtitle}></CardSubtitle>

      {#if hasCollectionLink && collectionLink}
        <a
          href={collectionLink}
          class="text-xs text-primary-300 hover:text-primary-200 transition-colors block w-full mb-4"
        >
          {$LL.multipass.state.proofStep.HAS_AVAILABLE_PROOFS.moreInfo()}
        </a>
      {/if}

      {#if $proofStepState === 'NO_PROOFS' && cardLink}
        <a
          type="button"
          target="_blank"
          href={cardLink}
          class="sni-secondary-btn !text-sm"
        >
          {$LL.multipass.state.proofStep.NO_PROOFS.cta()}
        </a>
      {/if}
    </svelte:fragment>
  </TimelineItem>
{/if}
