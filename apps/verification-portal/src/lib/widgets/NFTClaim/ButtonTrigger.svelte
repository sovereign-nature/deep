<script lang="ts">
  import { Drawer } from '@sni/ui-kit';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import { fly } from 'svelte/transition';
  import { Confetti } from 'svelte-confetti';
  import { getNFTClaimContext } from './context';
  const { claimStatus, destroyOnClose } = getNFTClaimContext();
  const triggerBtnClass =
    'bg-primary-400 shadow-lg text-white  rounded-full fixed bottom-4 right-4 sm:bottom-10 sm:right-10 z-50 px-4 py-2';

  export let drawerOpen: boolean;
</script>

{#if ($claimStatus === 'unclaimed' || $claimStatus === 'pending' || $claimStatus === 'valid') && !$destroyOnClose}
  <Drawer.Trigger
    on:click={() => (drawerOpen = true)}
    class={(!drawerOpen && $claimStatus === 'valid'
      ? 'bg-primary-100'
      : 'bg-primary-300',
    triggerBtnClass)}
  >
    {#if $claimStatus === 'unclaimed'}
      {$LL.claim.buttonCTA()}
    {:else if $claimStatus === 'pending'}
      {$LL.claim.buttonPending()}
    {:else if $claimStatus === 'valid'}
      <span transition:fly={{ y: 50, duration: 200, delay: 200 }}>
        {$LL.claim.buttonSuccess()}
        <Confetti delay={[100, 250]} rounded colorRange={[75, 175]} />
      </span>
    {/if}
  </Drawer.Trigger>
{/if}
