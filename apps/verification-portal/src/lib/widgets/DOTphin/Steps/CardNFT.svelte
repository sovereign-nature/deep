<script lang="ts">
  import { openModal } from '$lib/widgets/DOTphin/collectModalStore';

  import {
    multipassStepConfig,
    nftStepState,
  } from '$lib/features/MultipassStates';
  import FeaturedCard from '$lib/entities/featured/FeaturedCardSM.svelte';
  import TimelineItem from '$lib/widgets/DOTphin/TimelineItem/TimelineItem.svelte';
  import CardSubtitle from '$lib/widgets/DOTphin/TimelineItem/Typography/Subtitle.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import TimelineActionButton from '$lib/widgets/DOTphin/TimelineItem/TimelineActionButton.svelte';
  import CollectModal from '../CollectForm/CollectModal.svelte';

  const item = {
    id: '12',
    tokenId: '12',
    name: 'DOTphin Egg',
    description: 'lorem',
    image:
      'https://real.myfilebase.com/ipfs/QmagUnan8yPS7fFRL6hxk2VkdXbroD4AJGfLPDFzAgFEis/polkadot-decoded-2024-water.png',
    collection: {
      id: '665',
      name: '',
    },
    address: 'did:asset:eip155:8880.unique2:665:12',
  };
</script>

{#if $nftStepState === 'UNCLAIMED'}
  <TimelineItem
    itemState={$multipassStepConfig.nft.stepStatus}
    stepTitle={$LL.multipass.state.nftStep.stepTitle()}
    eggIcon
  >
    <svelte:fragment slot="header">
      <TimelineActionButton
        disabled={$multipassStepConfig.nft.stepStatus !== 'active'}
        title={$LL.multipass.state.nftStep.UNCLAIMED.cta()}
        on:click={() => openModal()}
      />
    </svelte:fragment>
    <svelte:fragment slot="content">
      <CardSubtitle
        content={$LL.multipass.state.nftStep.UNCLAIMED.subtitle()}
      />
    </svelte:fragment>
  </TimelineItem>
  <CollectModal></CollectModal>
{:else}
  <TimelineItem
    itemState={$multipassStepConfig.nft.stepStatus}
    stepTitle={$LL.multipass.state.nftStep.stepTitle()}
  >
    <svelte:fragment slot="featured">
      <div class="max-h-[200px] mb-12">
        <FeaturedCard {item} />
      </div>
    </svelte:fragment>
  </TimelineItem>
{/if}
