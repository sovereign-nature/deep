<script lang="ts">
  import { openModal } from '$lib/widgets/DOTphin/collectModalStore';
  import {
    multipassStepConfig,
    multipassData,
    nftStepState,
    isLoading,
  } from '$lib/features/MultipassStates';
  import FeaturedCard from '$lib/entities/featured/FeaturedCardSM.svelte';
  import TimelineItem from '$lib/widgets/DOTphin/TimelineItem/TimelineItem.svelte';
  import CardSubtitle from '$lib/widgets/DOTphin/TimelineItem/Typography/Subtitle.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import { Confetti } from 'svelte-confetti';
  import TimelineActionButton from '$lib/widgets/DOTphin/TimelineItem/TimelineActionButton.svelte';
  import {
    showConfetti,
    triggerConfetti,
  } from '$lib/widgets/DOTphin/confettiStore';

  $: if ($multipassData.nft.pending && !$showConfetti) {
    triggerConfetti();
  }
</script>

{#if $nftStepState === 'UNCLAIMED'}
  <TimelineItem
    itemState={$multipassStepConfig.nft.stepStatus}
    stepTitle={$LL.multipass.state.nftStep.stepTitle()}
    eggIcon
    isLoading={$isLoading}
  >
    <svelte:fragment slot="header">
      <TimelineActionButton
        umamiID="collect-orbo"
        disabled={$multipassStepConfig.nft.stepStatus !== 'active'}
        title={$LL.multipass.state.nftStep.UNCLAIMED.cta()}
        on:click={() => openModal('claim')}
      />
    </svelte:fragment>
    <svelte:fragment slot="content">
      <CardSubtitle
        content={$LL.multipass.state.nftStep.UNCLAIMED.subtitle()}
      />
    </svelte:fragment>
  </TimelineItem>
{:else}
  <TimelineItem
    itemState={$multipassStepConfig.nft.stepStatus}
    stepTitle={$LL.multipass.state.nftStep.stepTitle()}
    isLoading={$isLoading ||
      !$multipassData.nft.data ||
      $multipassData.nft.pending}
  >
    <svelte:fragment slot="featured">
      <div class="max-h-[200px] mb-12">
        <FeaturedCard item={$multipassData.nft.data} />
        {#if $showConfetti && !$isLoading}
          <Confetti delay={[100, 250]} rounded colorRange={[75, 175]} />
        {/if}
      </div>
    </svelte:fragment>
  </TimelineItem>
{/if}
