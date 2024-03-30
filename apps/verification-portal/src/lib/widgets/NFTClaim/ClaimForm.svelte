<script lang="ts">
  import { getContext } from 'svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  import Spinner from '$lib/components/icons/Spinner.svelte';
  import ArrowRight from '$lib/components/icons/ArrowRight.svelte';

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
    'disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 first:rounded-s-lg last:rounded-e-lg first:border-s last:border-e block border-none w-full border p-4 pe-14 sm:pe-4 xl:pl-10 text-lg font-aeonik text-gray-200 focus:border-white focus:ring-white dark:placeholder:text-primary-300 dark:bg-deep-green-700 rounded-lg sm:!rounded-l-sm sm:rounded-none ms-auto';
  const placeholder = 'Enter your address';
</script>

<form class=" max-w-2xl py-5" method="POST" use:enhance={submitClaim}>
  <input type="hidden" name="claim" value={$claimToken} />
  <input type="hidden" name="address" bind:value={address} />
  {#if errorMsg}
    <div class="text-red-500 mb-2">
      <p>{errorMsg}</p>
    </div>
  {/if}
  <label class="block text-sm font-bold mb-2 sr-only" for="address">
    Address
  </label>
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
          name="address-manual"
          class={inputClass}
          {placeholder}
          bind:value={$formManualAddress}
          disabled={$formUseWallet}
          required
        />
      {/if}
    </div>

    <button
      class="text-center font-medium focus-within:ring-2 focus-within:z-10 inline-flex items-center justify-center px-4 py-2 text-sm first:rounded-s-lg last:rounded-e-lg bg-primary-300 sm:w-20 border-none !p-2.5 rounded-lg sm:rounded-s-none ms-auto sm:!rounded-r-sm absolute top-1/2 right-3 transform -translate-y-1/2 sm:translate-y-0 sm:relative"
      type="submit"
      formaction="/?/claim"
      disabled={$formSending}
    >
      <ArrowRight className="h-4 w-4 sm:h-7 sm:w-7 text-deep-green-900" />
      {#if $formSending}
        <Spinner className="ms-2 w-5 h-5 text-primary-200  fill-primary-400 "
        ></Spinner>
        <p class="sr-only">sending form</p>
      {/if}
    </button>
  </div>

  <div class="mt-6">
    <div class="flex flex-col gap-5 sm:flex-row items-baseline mb-10">
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
</form>
