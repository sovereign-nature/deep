<script lang="ts">
  import { getContext } from 'svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { toast } from 'svelte-sonner';
  import { type Writable } from 'svelte/store';
  import { getNFTClaimContext } from '../context';
  import type { CrossmintResponse } from '../context';

  import ToggleLink from './ToggleLink.svelte';
  import InputAddress from './InputAddress.svelte';
  import ToggleRadio from './ToggleRadio.svelte';
  import { clearQueryParam } from '$lib/shared/utils';
  import { page } from '$app/stores';
  import { enhance, applyAction } from '$app/forms';

  const {
    destroyOnClose,
    formSending,
    formUseWallet,
    formManualAddress,
    claimSubmitted,
    claimResponse,
    claimToken,
    claimValid,
    claimPending,
    claimAddress,
  } = getNFTClaimContext();

  let web3Connected = getContext<Writable<boolean>>('web3Connected');
  let web3Address = getContext<Writable<string>>('web3Address');

  $: address =
    $web3Connected && $formUseWallet ? $web3Address : $formManualAddress;

  let errorMsg: string | undefined;
  const submitClaim: SubmitFunction = () => {
    $formSending = true;
    errorMsg = '';
    $claimAddress = address; //
    return async ({ result, update }) => {
      switch (result.type) {
        case 'success':
          $claimSubmitted = true;
          $claimValid = true;
          $claimPending = result?.data?.onChain?.status !== 'success';
          $claimResponse = (result.data as CrossmintResponse | null) ?? null;
          clearQueryParam('claim', true, $page.url);
          break;
        case 'failure':
          if (result?.data?.message !== undefined) {
            errorMsg = result.data.message;
          } else if (result?.data !== undefined) {
            if (
              typeof result.data === 'string' &&
              result.data === 'Invalid token'
            ) {
              $claimSubmitted = true;
              $claimValid = false;
              $destroyOnClose = true;
            }
            errorMsg = result?.data?.toString();
          } else {
            toast.error('Something went wrong');
          }
          break;
        case 'error':
          toast.error('Something went wrong');
          break;
        default:
          break;
      }

      applyAction(result);
      update({ invalidateAll: false }).finally(async () => {
        $formSending = false;
      });
    };
  };
</script>

<form class="max-w-2xl pb-5 px-1" method="POST" use:enhance={submitClaim}>
  <input type="hidden" name="claim" value={$claimToken} />
  <input type="hidden" name="address" bind:value={address} />

  <InputAddress {formUseWallet} {formManualAddress} {formSending} {errorMsg} />

  <div class="pt-6 relative">
    <div class="flex flex-col gap-5 sm:flex-row items-baseline mb-10 text-sm">
      <div class="md:hidden w-full">
        <ToggleLink {formUseWallet} />
      </div>
      <div class="hidden md:flex gap-5 items-center">
        <ToggleRadio {formUseWallet} />
      </div>
    </div>
  </div>
</form>
