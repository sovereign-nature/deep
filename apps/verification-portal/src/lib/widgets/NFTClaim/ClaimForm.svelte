<script lang="ts">
  import { getContext } from 'svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  import Spinner from '$lib/components/icons/Spinner.svelte';

  import type { Writable } from 'svelte/store';
  import Web3ConnectBtn from '$lib/widgets/ButtonWalletConnect/Web3ConnectBtn.svelte';
  import { enhance, applyAction } from '$app/forms';
  import { toast } from 'svelte-sonner';
  import { getNFTClaimContext } from './context';

  let web3Connected: Writable<boolean> = getContext('web3Connected');
  let web3Address: Writable<string> = getContext('web3Address');
  let manualAddress: string = '';
  $: useWalletAddress = $web3Connected;
  $: address =
    $web3Connected && useWalletAddress ? $web3Address : manualAddress;
  const {
    formSending,
    claimSubmitted,
    claimResponse,
    claimToken,
    claimValid,
    claimPending,
    claimAddress,
  } = getNFTClaimContext();
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
  {#if errorMsg}
    <div class="text-red-500">
      <p>{errorMsg}</p>
    </div>
  {/if}

  <input type="hidden" name="claim" value={$claimToken} />
  <input type="hidden" name="address" bind:value={address} />

  <div class="mb-4">
    <div class="mt-4">
      <label class="inline-flex items-center">
        <input
          type="radio"
          class="form-radio disabled:opacity-30"
          name="addressOption"
          bind:group={useWalletAddress}
          value={false}
        />
        <span class="ml-2">Enter address manually</span>
      </label>
      <label class="inline-flex items-center mt-2 ms-4">
        <input
          disabled={!$web3Connected}
          type="radio"
          class="form-radio disabled:opacity-30"
          name="addressOption"
          bind:group={useWalletAddress}
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
    </div>
  </div>
  <label class="block text-sm font-bold mb-2" for="address"> Address </label>
  {#if useWalletAddress && $web3Connected}
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
      bind:value={manualAddress}
      disabled={useWalletAddress}
    />
  {/if}

  <div class="flex items-center justify-between pt-4">
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
</form>
