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
    closeOnEscape={false}
  >
    <Drawer.Trigger
      on:click={() => (drawerOpen = true)}
      class="bg-primary-400 shadow-lg text-white rounded-full fixed bottom-4 right-4 sm:bottom-10 sm:right-10 z-20 px-4 py-2  "
    >
      ⭐ Claim Your Token ({$claimStatus})</Drawer.Trigger
    >
    <Drawer.Content
      class="bg-deep-green text-white border-none max-h-[96%] h-[96%] sm:h-auto"
    >
      <Drawer.Header
        class="container px-5 md:px-0 pt-4 relative w-full lg:w-4/5 mx-auto"
      >
        <Drawer.Title class="text-2xl">Claim your token</Drawer.Title>
        <Drawer.Close
          class="absolute right-5 top-5 bg-slate-100 text-gray-300 hover:bg-opacity-20 bg-opacity-10 p-2 w-7 h-7 rounded-full flex items-center justify-center text-sm "
          >x</Drawer.Close
        >
      </Drawer.Header>

      <div
        class="container pb-10 px-5 md:px-0 sticky top-0 w-full lg:w-4/5 mx-auto"
      >
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
