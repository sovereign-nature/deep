<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Confetti } from 'svelte-confetti';
  import { getNFTClaimContext } from './context';
  import CloseIcon from '$lib/components/icons/CloseIcon.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  const { claimStatus, destroyOnClose } = getNFTClaimContext();
  const triggerBtnClass =
    'bg-primary-400 hover:bg-primary-300 transition-colors shadow-lg text-white  rounded-full   px-4 py-2 relative';
  export let isOpen: boolean;
</script>

{#if ($claimStatus === 'unclaimed' || $claimStatus === 'pending' || $claimStatus === 'valid') && !$destroyOnClose}
  <div class=" fixed bottom-4 right-5 sm:bottom-10 sm:right-12 z-50">
    <button
      on:click={() => dispatch('click')}
      type="button"
      class={!isOpen && $claimStatus === 'valid'
        ? 'bg-primary-100 ' + triggerBtnClass
        : triggerBtnClass}
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
    </button>
    <button
      on:click={() => ($destroyOnClose = true)}
      class=" absolute -top-2.5 -right-3.5 bg-deep-green-600 transition-colors hover:bg-orange-500 border-gray-500 border text-gray-200 hover:text-white focus:outline-none whitespace-normal m-0.5 rounded-lg focus:ring-2 p-1.5 ms-auto flex items-center justify-center text-sm"
      ><span class="sr-only">Close claim modal</span>
      <CloseIcon className="w-3 h-3" />
    </button>
  </div>
{/if}
