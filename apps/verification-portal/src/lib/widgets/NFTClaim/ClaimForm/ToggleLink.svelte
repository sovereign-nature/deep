<!-- ToggleLink.svelte -->
<script lang="ts">
  import { type Writable } from 'svelte/store';
  export let formUseWallet: Writable<boolean>;

  function toggle() {
    formUseWallet.update((value) => !value);
  }
</script>

<div class="text-center text-gray-200 flex flex-col w-100 items-center gap-4">
  <span>OR</span>
  <button
    type="button"
    class="text-primary-400"
    on:click|preventDefault={toggle}
  >
    {#if $formUseWallet}
      Switch to manual input
    {:else}
      Connect a wallet
    {/if}
  </button>
</div>
