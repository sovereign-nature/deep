<!-- AddressInput.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  import { Input } from 'flowbite-svelte';
  import type { Writable } from 'svelte/store';
  import { Button } from 'flowbite-svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import { shortenAddress } from '$lib/shared/utils';
  import ArrowRight from '$lib/components/icons/ArrowRight.svelte';

  import Spinner from '$lib/components/icons/Spinner.svelte';
  import Web3ConnectBtn from '$lib/widgets/ButtonWalletConnect/Web3ConnectBtn.svelte';

  export let formUseWallet: Writable<boolean>;
  export let formManualAddress: Writable<string>;
  export let formEmail: Writable<string>;

  export let formSending: Writable<boolean>;
  export let errorMsg: string | undefined;
  export let showEmailField: boolean;
  let web3Connected = getContext<Writable<boolean>>('web3Connected');
  let web3Address = getContext<Writable<string>>('web3Address');
  const inputClassBase =
    'z-10 box-border disabled:cursor-not-allowed disabled:opacity-50 !ring-inset rtl:text-right dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 first:rounded-s-lg last:rounded-e-lg first:border-s last:border-e block border-none w-full border p-4 pe-14 sm:pe-4  text-lg font-aeonik text-deep-green-400 placeholder:text-deep-green-900 placeholder:text-opacity-80 focus:border-primary focus:ring-primary-300 placeholder:italic dark:placeholder:text-gray-300 placeholder:opacity-50 dark:bg-deep-green-700 rounded-lg';
  $: address =
    $web3Connected && $formUseWallet ? $web3Address : $formManualAddress;
  $: showEmailClass = showEmailField ? 'w-full' : 'h-16 ';
</script>

<div
  class="flex flex-col md:items-start w-full items-center gap-4 px-4 sm:px-0"
>
  {#if $formUseWallet && $web3Connected}
    <div class={`${showEmailClass} flex flex-col gap-2 max-w-md`}>
      <label class="text-sm text-gray-200" for="addressWallet">
        {$LL.claim.labelWalletAddress()}
      </label>
      <span
        class="truncate max-w-full text-primary-300 text-base"
        title={address}
      >
        {shortenAddress(address, 8)}
      </span>

      <input id="addressWallet" type="text" bind:value={address} hidden />
    </div>
  {:else if $formUseWallet}
    <div>
      <span class="block pb-2">{$LL.claim.labelConnectWallet()}</span>
      <Web3ConnectBtn buttonClass=" w-64 justify-center" alwaysOpen
      ></Web3ConnectBtn>
    </div>
  {:else}
    <div class="flex flex-col font-aeonik w-full gap-2 max-w-md">
      <label class="text-sm text-gray-200" for="addressManual">
        {$LL.claim.labelManualAddress()}
      </label>
      <div class="clearable-input">
        <Input
          id="addressManual"
          type="text"
          name="address-manual"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          tabindex="1"
          class={inputClassBase}
          placeholder={$LL.wallet.inputPlaceholder()}
          bind:value={$formManualAddress}
          required
        />
        <button
          type="button"
          class="clear-btn"
          on:click={() => ($formManualAddress = '')}
          data-umami-event="nft-claim-manual-input-clear"
          ><span class="sr-only">clear input</span>
        </button>
      </div>
    </div>
  {/if}

  {#if ($formUseWallet && $web3Connected) || !$formUseWallet}
    {#if showEmailField}
      <div class="flex flex-col font-aeonik w-full gap-2 max-w-md mb-5 md:mb-2">
        <div class="mt-0">
          <label class="text-sm text-gray-200 block" for="addressManual">
            {$LL.claim.labelEmailAddress()}
          </label>
        </div>
        <Input
          id="emailClaim"
          type="email"
          name="email"
          inputmode="email"
          tabindex="2"
          class={inputClassBase}
          placeholder={$LL.claim.placeholderEmail()}
          bind:value={$formEmail}
        />
        <span class="text-sm italic block text-gray-200 condense">
          {$LL.claim.descriptionEmail()}
        </span>
      </div>
    {/if}
    {#if errorMsg}
      <div class="text-red-500 mb-2 w-full max-w-md text-base">
        <p>{errorMsg}</p>
      </div>
    {/if}
    <Button
      color="none"
      class="z-50 bg-primary-400 font-aeonik hover:bg-primary-300  border-none max-w-48 w-full text-base mt-2 flex gap-2 hover:gap-4  transition-all"
      type="submit"
      tabindex="3"
      formaction="/?/claim"
      disabled={$formSending}
      data-umami-event="nft-claim-submit"
    >
      {$LL.claim.buttonSubmit()}
      {#if $formSending}
        <Spinner
          className="h-4 w-4 sm:h-7 sm:w-7 text-white fill-primary-200"
        />
        <p class="sr-only">sending form</p>
      {:else}
        <ArrowRight className="h-4 w-4 text-white" />
      {/if}
    </Button>
  {/if}
</div>
