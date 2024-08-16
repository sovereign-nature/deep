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
  $: containerClass =
    !$web3Connected && $formUseWallet
      ? 'text-gray-200 flex flex-col items-start gap-2 text-sm mt-6'
      : 'text-center text-gray-200 flex flex-row items-center gap-4 text-sm mt-4';
</script>

<div class={containerClass}>
  {#if !$web3Connected && $formUseWallet}
    <span> {$LL.claim.manualAddressPrompt()}</span>
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
