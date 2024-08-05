<!-- ToggleLink.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  import { type Writable } from 'svelte/store';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import Web3ConnectBtn from '$lib/widgets/ButtonWalletConnect/Web3ConnectBtn.svelte';
  export let formUseWallet: Writable<boolean>;
  let web3Connected = getContext<Writable<boolean>>('web3Connected');
</script>

<label class="inline-flex gap-5 items-center mt-2">
  <input
    disabled={!$web3Connected}
    type="radio"
    class="form-radio disabled:opacity-30 accent-primary-200 !text-primary-300 focus:ring-deep-green"
    name="addressOption"
    bind:group={$formUseWallet}
    value={true}
  />
  <span class="ml-1 flex flex-wrap gap-4 items-center">
    {#if $web3Connected}
      {$LL.claim.useWallet()}
    {/if}
    <Web3ConnectBtn alwaysOpen></Web3ConnectBtn>
  </span>
</label>
<label class="inline-flex gap-5 items-center">
  <input
    type="radio"
    class="form-radio disabled:opacity-30 accent-primary-200 !text-primary-300 focus:ring-deep-green"
    name="addressOption"
    bind:group={$formUseWallet}
    value={false}
  />
  <span class="ml-1">
    {$LL.claim.useManualInput()}
  </span>
</label>
