<script lang="ts">
  import { writable, readable, derived } from 'svelte/store';
  import { getContext } from 'svelte';
  import type { Writable, Readable } from 'svelte/store';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import { clearQueryParam } from '$lib/shared/utils';
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
  $: if (!drawerOpen && $destroyOnClose) {
    clearClaim();
  }

  function clearClaim() {
    clearQueryParam('claim');
  }
</script>

{#if $claimToken}
  <Drawer.Root
    bind:open={drawerOpen}
    closeOnOutsideClick={!$preventDrawerClose}
    closeOnEscape={false}
  >
    {#if ($claimStatus === 'unclaimed' || $claimStatus === 'pending') && !$destroyOnClose}
      <Drawer.Trigger
        on:click={() => (drawerOpen = true)}
        class="bg-primary-400 shadow-lg text-white rounded-full fixed bottom-4 right-4 sm:bottom-10 sm:right-10 z-20 px-4 py-2  "
      >
        {#if $claimStatus === 'unclaimed'}
          {$LL.claim.buttonCTA()}
          {$claimToken}
        {:else if $claimStatus === 'pending'}
          {$LL.claim.buttonPending()}
        {/if}
      </Drawer.Trigger>
    {/if}
    <Drawer.Content
      class="bg-deep-green text-white border-none max-h-[96%] h-[96%] sm:h-auto pb-4"
    >
      <Drawer.Header
        class="container px-5 lg:px-0 pt-4 pb-8 relative w-full lg:w-4/5 mx-auto"
      >
        <Drawer.Title class="text-2xl lg:text-3xl font-normal me-8 sm:me-auto">
          {#if $claimStatus === 'valid'}
            {$LL.claim.titleValid()}
          {:else if $claimStatus === 'pending'}
            {$LL.claim.titlePending()}
          {:else if $claimStatus === 'invalid'}
            {$LL.claim.titleInvalid()}
          {:else}
            {$LL.claim.titleClaim()}
          {/if}
        </Drawer.Title>
        <Drawer.Close
          class="absolute right-5 top-5 text-gray-200 hover:text-white  focus:outline-none whitespace-normal m-0.5 rounded-lg focus:ring-2 p-1.5 ms-auto flex items-center justify-center text-sm "
          ><span class="sr-only">Close modal</span>
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path></svg
          >
        </Drawer.Close>
      </Drawer.Header>

      <div
        class="container pb-10 px-5 lg:px-0 sticky top-0 w-full lg:w-4/5 mx-auto"
      >
        {#if $claimStatus === 'valid'}
          <ClaimData></ClaimData>
        {:else if $claimStatus === 'pending'}
          <ClaimData>
            <CheckForm></CheckForm>
          </ClaimData>
        {:else if $claimStatus === 'invalid'}
          <div class="pb-20">
            {$LL.claim.invalidMessage()}
          </div>
        {:else}
          <ClaimForm></ClaimForm>
        {/if}
      </div>
    </Drawer.Content>
  </Drawer.Root>
{/if}
