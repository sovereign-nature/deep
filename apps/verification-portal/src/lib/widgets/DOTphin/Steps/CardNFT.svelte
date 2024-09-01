<script lang="ts">
  import { state, nftStepState } from '$lib/widgets/DOTphin/MultipassStates';
  import FeaturedCard from '$lib/entities/featured/FeaturedCardSM.svelte';
  import TimelineItem from '$lib/widgets/DOTphin/TimelineItem/TimelineItem.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';

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
  <TimelineItem itemState={$state.nft.status} stepTitle="NFT" eggIcon>
    <svelte:fragment slot="header">
      <button
        type="button"
        class="px-4 py-2 rounded-full whitespace-nowrap disabled:opacity-80 disabled:cursor-not-allowed drop-shadow-sm text-white bg-primary-400 hover:bg-primary-300 font-aeonik text-base"
        >Unlock the Egg</button
      >
    </svelte:fragment>
    <svelte:fragment slot="content">
      <div class="my-4 flex items-start flex-wrap gap-3">
        <p
          class=" text-sm font-normal text-gray-500 dark:text-gray-400 block w-full"
        >
          {$LL.multipass.state.noProof.content()}
        </p>
      </div>
    </svelte:fragment>
  </TimelineItem>
{:else}
  <TimelineItem itemState={$state.nft.status} stepTitle="NFT">
    <svelte:fragment slot="featured">
      <FeaturedCard {item} />
    </svelte:fragment>
  </TimelineItem>
{/if}
