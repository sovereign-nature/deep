<script lang="ts">
  import { getNFTClaimContext } from './context';
  import Property from '$lib/shared/typography/Property.svelte';
  import NftImage from '$lib/components/NFTImage.svelte';
  import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
  const { claimResponse, claimStatus } = getNFTClaimContext();
</script>

{#if $claimStatus === 'valid'}
  <div class="flex flex-col md:flex-row gap-8 my-4">
    <NftImage
      url={$claimResponse.metadata.image}
      alt={$claimResponse.metadata.name}
    />
    <div>
      <div>
        <h2 class="text-2xl">{$claimResponse.metadata.name}</h2>
        <p>{$claimResponse.metadata.description}</p>
        {#if $claimResponse?.onChain}
          <div class="mt-4">
            <Property name="Chain">
              <p>{$claimResponse.onChain.chain}</p>
            </Property>
            <Property name="Contract Address">
              <p>{$claimResponse.onChain.contractAddress}</p>
            </Property>
            <Property name="Owner">
              <p>{$claimResponse.onChain.owner}</p>
            </Property>
            <Property name="Token ID">
              <p>{$claimResponse.onChain.tokenId}</p>
            </Property>
          </div>
        {/if}
      </div>
    </div>
  </div>
{:else if $claimStatus === 'pending'}
  <div class="flex flex-row gap-8 my-4">
    <div class="w-56 h-56 md:h-64 md:w-64 rounded-lg overflow-hidden">
      <ImagePlaceholder className="w-56 h-56 md:h-64 md:w-64 block "
      ></ImagePlaceholder>
    </div>

    <div>
      <div>
        <h2 class="font-aeonik text-2xl">Your claim is pending</h2>
        <slot />
        {#if $claimResponse?.onChain}
          <div class="mt-4">
            <Property name="Chain">
              <p>{$claimResponse.onChain.chain}</p>
            </Property>
            <Property name="Contract Address">
              <p>{$claimResponse.onChain.contractAddress}</p>
            </Property>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
