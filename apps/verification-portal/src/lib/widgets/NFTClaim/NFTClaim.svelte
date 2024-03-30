<script lang="ts">
  import { writable, readable, derived } from 'svelte/store';
  import { getContext } from 'svelte';
  import type { Writable, Readable } from 'svelte/store';

  import { Drawer } from '@sni/ui-kit';
  import { page } from '$app/stores';
  import ClaimForm from './ClaimForm.svelte';
  import CheckForm from './CheckForm.svelte';
  import ClaimData from './ClaimData.svelte';
  import { setNFTClaimContext } from './context.js';

  const claim = $page.url.searchParams.get('claim');
  export let claimIsSubmitted = false;

  const claimToken = readable(claim);
  const formSending = writable(false);
  const formUseWallet = writable(true);
  const formManualAddress = writable('');
  const claimResponse = writable(null);
  const claimSubmitted = writable(claimIsSubmitted);
  const claimValid = writable(false);
  const claimPending = writable(true);
  const destroyOnClose = writable(false);
  const claimAddress = writable('');
  let drawerOpen = $claimToken && $claimToken.length > 0 ? true : false;

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
        return 'unclaimed';
      }
    }
  );

  setNFTClaimContext({
    claimToken,
    formSending,
    formUseWallet,
    formManualAddress,
    claimResponse,
    claimSubmitted,
    claimValid,
    claimPending,
    destroyOnClose,
    claimAddress,
    claimStatus,
  });
  let web3Connected: Writable<boolean> = getContext('web3Connected');
  const preventDrawerClose: Readable<boolean> = getContext('web3ModalOpen'); // allow click outside drawer only when modal is open;

  $: $formUseWallet = $web3Connected;
</script>

{#if $claimToken || $claimSubmitted}
  <Drawer.Root
    bind:open={drawerOpen}
    closeOnOutsideClick={!$preventDrawerClose}
  >
    <Drawer.Trigger
      on:click={() => (drawerOpen = true)}
      class="bg-primary-400 text-white rounded-full fixed bottom-10 right-10 z-10 px-4 py-2"
    >
      ⭐ Claim Your Token ( status: {$claimStatus})</Drawer.Trigger
    >
    <Drawer.Content class="bg-deep-green text-white border-none">
      <Drawer.Header class="container p-0 pt-4 relative">
        <Drawer.Close class="absolute right-5 top-4 ">Close X</Drawer.Close>
        <Drawer.Title class="text-2xl">Claim you token</Drawer.Title>
        <Drawer.Description
          >Enter your address to claim or check your claim status</Drawer.Description
        >
      </Drawer.Header>

      <div class="container pb-10 px-5 sm:px-0">
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
    </Drawer.Content>
  </Drawer.Root>
{/if}
