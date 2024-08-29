<script lang="ts">
  import TimelineItem from '../TimelineItem/TimelineItem.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import { state } from '../MultipassStates';
</script>

<TimelineItem itemState={$state.nft.status} stepTitle="NFT" eggIcon>
  <svelte:fragment slot="header">
    <h3 class="text-xl">NFT</h3>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="my-4 flex items-start flex-wrap gap-3">
      <p
        class=" text-sm font-normal text-gray-500 dark:text-gray-400 block w-full"
      >
        {$LL.multipass.state.noProof.content()}
      </p>
      <div>
        <h2>NFT Card</h2>
        <p>Status: {$state.nft.status}</p>
        <p>Claimed: {$state.nft.claimed}</p>
      </div>
    </div>
  </svelte:fragment>
</TimelineItem>
