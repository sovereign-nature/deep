<script lang="ts">
  import { getNFTClaimContext } from './context';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import CardHeader from '$lib/shared/typography/CardHeader.svelte';
  import Property from '$lib/shared/typography/Property.svelte';
  import NftImage from '$lib/components/NFTImage.svelte';
  import SkeletonCard from '$lib/shared/components/SkeletonCard.svelte';
  import SocialFollowMenu from '$lib/entities/SocialFollow/SocialFollowMenu.svelte';

  const { claimResponse, claimStatus } = getNFTClaimContext();
</script>

{#if $claimStatus === 'valid'}
  <div
    class="flex flex-col items-center md:items-start md:flex-row gap-x-12 gap-y-4"
  >
    {#if $claimResponse?.metadata?.image}
      <NftImage
        containerClass="w-48 h-48  rounded-lg mb-2 overflow-hidden text-center bg-deep-green-900"
        imgClass="w-48 h-48"
        url={$claimResponse?.metadata?.image}
        alt={$claimResponse?.metadata?.name}
      />
    {/if}

    <div>
      <div class="flex flex-col items-center md:items-start">
        <CardHeader
          className="mb-0"
          title={$claimResponse?.metadata?.name}
          url={`/assets/${$claimResponse?.assetDID}`}
        />
        <p>{$claimResponse?.metadata?.description}</p>
        <slot />
        {#if $claimResponse?.onChain}
          <div class="mt-4 self-start">
            <Property name="Chain">
              <p>{$claimResponse.onChain?.chain}</p>
            </Property>
            <Property name="Contract Address">
              <p>{$claimResponse.onChain?.contractAddress}</p>
            </Property>
            <Property name="Owner">
              <p>{$claimResponse.onChain?.owner}</p>
            </Property>
            <Property name="Token ID">
              <p>{$claimResponse.onChain?.tokenId}</p>
            </Property>
          </div>
        {/if}
        <SocialFollowMenu wrapperClass="text-white mt-2" iconsOnly />
      </div>
    </div>
  </div>
{:else if $claimStatus === 'pending'}
  <div
    class="flex flex-col items-center md:items-start md:flex-row gap-x-12 gap-y-4"
  >
    {#if $claimResponse?.metadata?.image}
      <NftImage
        containerClass="w-48 h-48  rounded-lg mb-2 overflow-hidden text-center bg-deep-green-900"
        imgClass="w-48 h-48"
        url={$claimResponse?.metadata?.image}
        alt={$claimResponse?.metadata?.name}
      />
    {:else}
      <div class="hidden md:block w-48 h-48 rounded-lg overflow-hidden">
        <SkeletonCard className="w-48 h-48 block "></SkeletonCard>
      </div>
    {/if}
    <div>
      <div class="flex flex-col items-center md:items-start">
        <slot />
        <p class="text-sm my-3">{$LL.claim.descriptionPending()}</p>

        {#if $claimResponse?.onChain}
          <div class="mt-4 self-start">
            <Property name="Chain">
              <p>{$claimResponse.onChain?.chain}</p>
            </Property>
            <Property name="Contract Address">
              <p>{$claimResponse.onChain?.contractAddress}</p>
            </Property>
          </div>
        {/if}
        <SocialFollowMenu wrapperClass="text-white mt-2" iconsOnly />
      </div>
    </div>
  </div>
{/if}
