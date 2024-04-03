<script lang="ts">
  import { getNFTClaimContext } from './context';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import Spinner from '$lib/components/icons/Spinner.svelte';
  const { formSending } = getNFTClaimContext();
</script>

<button
  class="bg-primary-400 hover:bg-primary-300 disabled:opacity-80 text-white font-aeonik py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline flex"
  disabled={$formSending}
  on:click
>
  {$LL.claim.checkClaim()}
  {#if $formSending}
    <Spinner className="ms-2 w-5 h-5 text-primary-200  fill-primary-400 "
    ></Spinner>
    <p class="sr-only">sending form</p>
  {/if}
</button>
