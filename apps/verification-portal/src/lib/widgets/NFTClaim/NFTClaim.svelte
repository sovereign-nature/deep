<script lang="ts">
  import { writable, readable, derived } from 'svelte/store';

  import { page } from '$app/stores';
  import ClaimForm from './ClaimForm.svelte';
  import CheckForm from './CheckForm.svelte';
  import ClaimData from './ClaimData.svelte';
  import { setNFTClaimContext } from './context.js';

  const claim = $page.url.searchParams.get('claim');
  export let claimIsSubmitted = false;

  const claimToken = readable(claim);
  const formSending = writable(false);
  const claimResponse = writable(null);
  const claimSubmitted = writable(claimIsSubmitted);
  const claimValid = writable(false);
  const claimPending = writable(true);
  const destroyOnClose = writable(false);
  const claimAddress = writable('');

  const claimStatus = derived(
    [claimSubmitted, claimValid, claimPending],
    ([$claimSubmitted, $claimValid, $claimPending]) => {
      if ($claimSubmitted) {
        if ($claimValid && !$claimPending) {
          return 'valid';
        } else if ($claimValid) {
          return 'pending';
        } else {
          return 'invalid';
        }
      } else {
        return 'unknown';
      }
    }
  );

  setNFTClaimContext({
    claimToken,
    formSending,
    claimResponse,
    claimSubmitted,
    claimValid,
    claimPending,
    destroyOnClose,
    claimAddress,
    claimStatus,
  });
</script>

{#if $claimToken || $claimSubmitted}
  <div class="bg-deep-green rounded p-4 text-white">
    {#if $claimStatus === 'valid'}
      <ClaimData></ClaimData>
    {:else if $claimStatus === 'pending'}
      <ClaimData>
        <CheckForm></CheckForm>
      </ClaimData>
    {:else if $claimStatus === 'invalid'}
      <strong>This claim is invalid</strong>
    {:else}
      <ClaimForm></ClaimForm>
    {/if}
  </div>
{/if}
