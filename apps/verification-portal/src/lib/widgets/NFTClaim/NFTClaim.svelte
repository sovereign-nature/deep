<script lang="ts">
  import { writable, readable, derived } from 'svelte/store';
  import { getContext } from 'svelte';
  import type { Readable } from 'svelte/store';
  import { Drawer } from 'flowbite-svelte';
  import { sineInOut } from 'svelte/easing';
  import { Confetti } from 'svelte-confetti';
  import { toast } from 'svelte-sonner';
  import type { ActionResult } from '@sveltejs/kit';
  import ClaimForm from './ClaimForm/ClaimForm.svelte';
  import ClaimData from './ClaimData.svelte';
  import { setNFTClaimContext } from './context';
  import type { CrossmintResponse } from './context';
  import CheckButton from './ButtonCheck.svelte';
  import TriggerButton from './ButtonTrigger.svelte';
  import CloseButton from './ButtonClose.svelte';
  import { page } from '$app/stores';
  import { clearQueryParam } from '$lib/shared/utils';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import { deserialize } from '$app/forms';

  export let claimIsSubmitted = false;

  const claim = $page.url.searchParams.get('claim');
  const claimToken = readable(claim);
  const formSending = writable(false);
  const formUseWallet = writable(true);
  const formManualAddress = writable('');
  const claimResponse = writable<CrossmintResponse | null>(null);
  const claimSubmitted = writable(claimIsSubmitted);
  const claimValid = writable(false);
  const claimPending = writable(true);
  const destroyOnClose = writable(false);
  const claimAddress = writable('');
  const preventDrawerClose: Readable<boolean> = getContext('web3ModalOpen'); // allow click outside drawer only when modal is open;

  let drawerHidden = $claimToken && $claimToken.length > 0 ? false : true;
  let intervalId: NodeJS.Timeout;
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
  const drawerContentClass =
    'overflow-y-auto bg-deep-green text-white border-none max-h-[86%]  sm:h-auto pb-4 z-drawer rounded-t-lg lg:rounded-t-xl';
  const drawerHeaderClass = `container sticky md:relative top-0 md:top-unset z-50 mx-auto w-full lg:w-4/5 px-5 lg:px-0 pt-6 lg:pt-8 pb-6 text-center md:text-start bg-deep-green outline outline-1 outline-deep-green`;
  const drawerTitleClass = 'text-[26px]  font-normal me-8 sm:me-auto';
  const drawerBodyClass =
    'container pb-10 px-5 lg:px-0 sticky top-0 w-full lg:w-4/5 mx-auto overflow-auto sm:overflow-hidden';

  const transitionParamsBottom = {
    y: 320,
    duration: 200,
    easing: sineInOut,
  };

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

  $: $formUseWallet = true;

  // destroy the drawer fully only when it is closed
  $: if (!drawerHidden && $destroyOnClose) {
    clearClaim(false);
  }

  //on pending state activate check interval
  $: if ($claimPending && $claimSubmitted) {
    if (!intervalId) {
      intervalId = setInterval(() => {
        if (!$formSending) {
          checkClaim();
        }
      }, 10000); //10 seconds
    }
  }
  //clear interval if user dismisses CTA during pending state
  $: if ($destroyOnClose) {
    clearInterval(intervalId);
  }

  function clearClaim(replaceHistory: boolean) {
    clearQueryParam('claim', replaceHistory, $page.url);
  }

  const checkClaim = async () => {
    $formSending = true;
    try {
      const response = await fetch('/?/claim', {
        method: 'POST',
        headers: {
          'x-sveltekit-action': 'true',
        },
        body: new URLSearchParams({
          address: $claimAddress,
          claim: $claimToken || '',
        }),
      });
      const result: ActionResult = deserialize(await response.text());

      switch (result.type) {
        case 'success':
          $claimPending = result?.data?.onChain?.status !== 'success';
          if (!$claimPending) {
            $claimResponse = result?.data as CrossmintResponse | null;
            clearInterval(intervalId);
          }
          break;
        case 'failure':
          toast.error(
            result?.data?.message !== undefined
              ? String(result?.data.message)
              : 'Something went wrong'
          );
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      $formSending = false;
    }
  };
</script>

{#if $claimToken}
  <TriggerButton
    isOpen={!drawerHidden}
    on:click={() => (drawerHidden = false)}
  />
  <Drawer
    placement="bottom"
    width="w-full"
    divClass={drawerContentClass}
    bgOpacity="bg-opacity-75 z-modalOverlay"
    transitionType="fly"
    transitionParams={transitionParamsBottom}
    bind:hidden={drawerHidden}
    activateClickOutside={!$preventDrawerClose}
    id="claimDrawer"
  >
    <div class={drawerHeaderClass}>
      <h2 class={drawerTitleClass}>
        {#if $claimStatus === 'valid'}
          {$LL.claim.titleValid()}
        {:else if $claimStatus === 'pending'}
          {$LL.claim.titlePending()}
        {:else if $claimStatus === 'invalid'}
          {$LL.claim.titleInvalid()}
        {:else}
          {$LL.claim.titleClaim()}
        {/if}
      </h2>
      <CloseButton on:click={() => (drawerHidden = true)} />
    </div>

    <div class={drawerBodyClass}>
      {#if $claimStatus === 'valid'}
        <ClaimData>
          <Confetti
            delay={[100, 250]}
            rounded
            colorRange={[75, 175]}
          /></ClaimData
        >
      {:else if $claimStatus === 'pending'}
        <ClaimData>
          <CheckButton on:click={checkClaim}></CheckButton>
        </ClaimData>
      {:else if $claimStatus === 'invalid'}
        <div class="pb-20 max-w-md md:max-w-full mx-auto">
          {$LL.claim.invalidMessage()}
        </div>
      {:else}
        <ClaimForm></ClaimForm>
      {/if}
    </div>
  </Drawer>
{/if}
