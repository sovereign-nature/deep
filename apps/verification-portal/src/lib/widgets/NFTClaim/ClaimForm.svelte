<script lang="ts">
  import { getContext } from 'svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  import Spinner from '$lib/components/icons/Spinner.svelte';

  import type { Writable } from 'svelte/store';
  import Web3ConnectBtn from '$lib/widgets/ButtonWalletConnect/Web3ConnectBtn.svelte';
  import { enhance, applyAction } from '$app/forms';
  import { toast } from 'svelte-sonner';
  import { getNFTClaimContext } from './context';

  const {
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

  let web3Connected: Writable<boolean> = getContext('web3Connected');
  let web3Address: Writable<string> = getContext('web3Address');

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
          $claimResponse = result.data;
          console.log(result);
          break;
        case 'failure':
          console.log(result);
          if (result?.data?.message !== undefined) {
            errorMsg = result.data.message;
          } else if (result?.data !== undefined) {
            if (result.data === 'Invalid token') {
              $claimSubmitted = true;
              $claimValid = false;
              toast.error(result.data);
            }
            errorMsg = result?.data;
          } else {
            toast.error('Something went wrong');
          }
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

  const inputClass =
    'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-deep-green';
  const placeholder = 'Enter your address';
</script>

<form class=" max-w-2xl py-5" method="POST" use:enhance={submitClaim}>
  <input type="hidden" name="claim" value={$claimToken} />
  <input type="hidden" name="address" bind:value={address} />

  <div class="mb-4">
    <div class="flex flex-col gap-5 sm:flex-row items-baseline">
      <label class="inline-flex gap-5 items-center mt-2">
        <input
          disabled={!$web3Connected}
          type="radio"
          class="form-radio disabled:opacity-30"
          name="addressOption"
          bind:group={$formUseWallet}
          value={true}
        />
        <span class="ml-2">
          {#if $web3Connected}
            Use wallet address
          {:else}
            <Web3ConnectBtn alwaysOpen></Web3ConnectBtn>
          {/if}
        </span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="radio"
          class="form-radio disabled:opacity-30"
          name="addressOption"
          bind:group={$formUseWallet}
          value={false}
        />
        <span class="ml-2">Enter address manually</span>
      </label>
    </div>
  </div>
  <label class="block text-sm font-bold mb-2" for="address"> Address </label>
  <div class="flex flex-row w-full">
    <div class="w-full">
      {#if $formUseWallet && $web3Connected}
        <input
          id="addressWallet"
          type="text"
          class={inputClass}
          bind:value={address}
          readonly
        />
      {:else}
        <input
          id="addressManual"
          type="text"
          class={inputClass}
          {placeholder}
          bind:value={$formManualAddress}
          disabled={$formUseWallet}
        />
      {/if}
    </div>

    <div class="flex items-center justify-between">
      <button
        class="bg-primary-400 hover:bg-primary-300 disabled:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex flex-row"
        type="submit"
        formaction="/?/claim"
        disabled={$formSending}
      >
        Submit
        {#if $formSending}
          <Spinner className="ms-2 w-5 h-5 text-primary-200  fill-primary-400 "
          ></Spinner>
          <p class="sr-only">sending form</p>
        {/if}
      </button>
    </div>
  </div>

  <div class="text-red-500 h-8 mt-2">
    {#if errorMsg}
      <p>{errorMsg}</p>
    {/if}
  </div>
</form>
