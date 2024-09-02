<script lang="ts">
  import { state, nftStepState } from '$lib/widgets/DOTphin/MultipassStates';
  import FeaturedCard from '$lib/entities/featured/FeaturedCardSM.svelte';
  import TimelineItem from '$lib/widgets/DOTphin/TimelineItem/TimelineItem.svelte';
  import CardSubtitle from '$lib/widgets/DOTphin/TimelineItem/Typography/Subtitle.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import TimelineActionButton from '$lib/widgets/DOTphin/TimelineItem/TimelineActionButton.svelte';

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
    itemState={$state.nft.status}
    stepTitle={$LL.multipass.state.nftStep.stepTitle()}
    eggIcon
  >
    <svelte:fragment slot="header">
      <TimelineActionButton
        disabled={$state.nft.status !== 'active'}
        title={$LL.multipass.state.nftStep.UNCLAIMED.cta()}
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
    itemState={$state.nft.status}
    stepTitle={$LL.multipass.state.nftStep.stepTitle()}
  >
    <svelte:fragment slot="featured">
      <div class="max-h-[200px] mb-12">
        <FeaturedCard {item} />
      </div>
    </svelte:fragment>
  </TimelineItem>
{/if}
