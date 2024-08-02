<!-- AddressInput.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';

  import { Input } from 'flowbite-svelte';
  import type { Writable } from 'svelte/store';
  import { Button, ButtonGroup } from 'flowbite-svelte';
  import Spinner from '$lib/components/icons/Spinner.svelte';
  import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
  import Web3ConnectBtn from '$lib/widgets/ButtonWalletConnect/Web3ConnectBtn.svelte';

  export let formUseWallet: Writable<boolean>;

  export let formManualAddress: Writable<string>;
  export let formSending: Writable<boolean>;
  export let errorMsg: string | undefined;
  let web3Connected = getContext<Writable<boolean>>('web3Connected');
  let web3Address = getContext<Writable<string>>('web3Address');
  const inputClassBase =
    'z-10 box-border disabled:cursor-not-allowed disabled:opacity-50 !ring-inset rtl:text-right dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 first:rounded-s-lg last:rounded-e-lg first:border-s last:border-e block border-none w-full border p-4 pe-14 sm:pe-4 xl:pl-10 text-lg font-aeonik text-deep-green-400 placeholder:text-deep-green-900 placeholder:text-opacity-80 focus:border-primary focus:ring-primary-300 dark:placeholder:text-primary-300 dark:bg-deep-green-700 rounded-lg';
  const inputClass =
    inputClassBase + 'sm:!rounded-l-sm sm:rounded-none ms-auto  ';
  const placeholder = $LL.wallet.inputPlaceholder();
  $: address =
    $web3Connected && $formUseWallet ? $web3Address : $formManualAddress;
</script>

<div class="flex flex-col w-full items-center md:hidden gap-4">
  {#if $formUseWallet && $web3Connected}
    <div class="flex flex-col w-full gap-2 mb-4 max-w-md">
      <label class="text-sm text-gray-200" for="addressWallet">
        Claiming address:
      </label>
      <span class="truncate max-w-full h-10 text-primary-300 text-base">
        {address}
      </span>

      <!-- <Web3ConnectBtn alwaysOpen></Web3ConnectBtn> -->
      <input id="addressWallet" type="text" bind:value={address} hidden />
    </div>
  {:else if $formUseWallet}
    <div>
      <span class="block pb-2">Connect your ETH wallet</span>
      <Web3ConnectBtn buttonClass=" w-64 justify-center" alwaysOpen
      ></Web3ConnectBtn>
    </div>
  {:else}
    <div class="flex flex-col w-full gap-2 max-w-md">
      <label class="text-sm text-gray-200" for="addressManual">
        Enter a valid wallet address:
      </label>
      <Input
        id="addressManual"
        type="text"
        name="address-manual"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        tabindex="0"
        class={inputClassBase}
        placeholder="e.g.0x1234.."
        bind:value={$formManualAddress}
        required
      />
    </div>
  {/if}
  {#if ($formUseWallet && $web3Connected) || !$formUseWallet}
    {#if errorMsg}
      <div class="text-red-500 mb-2 w-full max-w-md">
        <p>{errorMsg}</p>
      </div>
    {/if}
    <Button
      color="none"
      class="z-50 bg-primary-400 hover:bg-primary-300  border-none max-w-48 w-full text-base"
      type="submit"
      tabindex="1"
      formaction="/?/claim"
      disabled={$formSending}
    >
      Submit Claim
      {#if $formSending}
        <Spinner
          className="h-4 w-4 sm:h-7 sm:w-7 text-white fill-primary-200"
        />
        <p class="sr-only">sending form</p>
      {/if}
    </Button>
  {/if}
</div>
{#if errorMsg}
  <div class="text-red-500 mb-2 hidden md:block">
    <p>{errorMsg}</p>
  </div>
{/if}

<ButtonGroup
  divClass="hidden -z-1 relative w-full flex-row md:inline-flex justify-items-stretch"
>
  {#if $formUseWallet && $web3Connected}
    <Input
      id="addressWallet"
      type="text"
      class={inputClass}
      bind:value={address}
      readonly
    />
  {:else}
    <Input
      id="addressManual"
      type="text"
      name="address-manual"
      tabindex="0"
      class={inputClass}
      {placeholder}
      bind:value={$formManualAddress}
      required
    />
  {/if}
  <Button
    color="none"
    class="z-50 bg-primary-300 hover:bg-primary-200 sm:w-20 border-none !p-2.5 rounded-lg sm:rounded-s-none ms-auto sm:!rounded-r-sm absolute top-1/2 right-3 transform sm:right-0 -translate-y-1/2 sm:translate-y-0 sm:relative"
    type="submit"
    tabindex="1"
    formaction="/?/claim"
    disabled={$formSending}
  >
    {#if !$formSending}
      <ArrowRight className="h-4 w-4 sm:h-7 sm:w-7 text-deep-green-900" />
    {:else}
      <Spinner className="h-4 w-4 sm:h-7 sm:w-7 text-white fill-primary-200" />
      <p class="sr-only">sending form</p>
    {/if}
  </Button>
</ButtonGroup>
