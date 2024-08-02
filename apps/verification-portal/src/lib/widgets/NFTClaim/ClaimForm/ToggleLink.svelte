<!-- ToggleLink.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  import { type Writable } from 'svelte/store';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  export let formUseWallet: Writable<boolean>;
  let web3Connected = getContext<Writable<boolean>>('web3Connected');

  function toggle() {
    formUseWallet.update((value) => !value);
  }
</script>

<div class="text-center text-gray-200 flex flex-col w-100 items-center gap-4">
  {#if !$web3Connected && $formUseWallet}
    <span class="whitespace-pre-line"> {$LL.claim.manualAddressPrompt()}</span>
  {:else}
    <span>OR</span>
  {/if}
  <button
    type="button"
    class="text-primary-400"
    on:click|preventDefault={toggle}
  >
    {#if $formUseWallet}
      {$LL.claim.toggleLinkManual()}
    {:else}
      {$LL.claim.toggleLinkWallet()}
    {/if}
  </button>
</div>
