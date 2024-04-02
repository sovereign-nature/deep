<script lang="ts">
  import { getNFTClaimContext } from './context';
  import Property from '$lib/shared/typography/Property.svelte';
  import NftImage from '$lib/components/NFTImage.svelte';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  const { claimResponse, claimStatus } = getNFTClaimContext();
</script>

{#if $claimStatus === 'valid'}
  <div class="flex flex-col md:flex-row gap-x-12 gap-y-4">
    {#if $claimResponse?.metadata?.image}
      <NftImage
        containerClass="w-48 h-48  rounded-lg mb-2 overflow-hidden text-center bg-deep-green-900"
        imgClass="w-48 h-48"
        url={$claimResponse?.metadata?.image}
        alt={$claimResponse?.metadata?.name}
      />
    {/if}
    <div>
      <div>
        <h2 class="text-2xl">{$claimResponse?.metadata?.name}</h2>
        <p>{$claimResponse?.metadata?.description}</p>
        {#if $claimResponse?.onChain}
          <div class="mt-4">
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
      </div>
    </div>
  </div>
{:else if $claimStatus === 'pending'}
  <div class="flex flex-col md:flex-row gap-x-12 gap-y-4">
    <div class="hidden md:block w-48 h-48 rounded-lg overflow-hidden">
      <ImagePlaceholder className="w-48 h-48 block "></ImagePlaceholder>
    </div>

    <div>
      <div>
        <slot />
        {#if $claimResponse?.onChain}
          <div class="mt-4">
            <Property name="Chain">
              <p>{$claimResponse.onChain?.chain}</p>
            </Property>
            <Property name="Contract Address">
              <p>{$claimResponse.onChain?.contractAddress}</p>
            </Property>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
