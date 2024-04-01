<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { toast } from 'svelte-sonner';
  import { getNFTClaimContext } from './context';
  import { enhance, applyAction } from '$app/forms';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import type { CrossmintResponse } from './context';

  import Spinner from '$lib/components/icons/Spinner.svelte';

  const {
    destroyOnClose,
    claimAddress,
    claimToken,
    formSending,
    claimPending,
    claimResponse,
  } = getNFTClaimContext();

  const checkClaim: SubmitFunction = () => {
    $formSending = true;

    return async ({ result, update }) => {
      switch (result.type) {
        case 'success':
          $claimPending = result?.data?.onChain?.status !== 'success';
          if (!$claimPending) {
            $claimResponse = (result.data as CrossmintResponse | null) ?? null;
            $destroyOnClose = true;
          }
          break;
        case 'failure':
          toast.error(
            result && result?.data?.message !== undefined
              ? String(result.data.message)
              : 'Something went wrong'
          );
          break;
        default:
          break;
      }

      applyAction(result);
      update({ invalidateAll: false, reset: false }).finally(async () => {
        $formSending = false;
      });
    };
  };
</script>

<form class=" max-w-2xl text-black" method="POST" use:enhance={checkClaim}>
  <input name="address" type="text" value={$claimAddress} readonly hidden />

  <input name="claim" type="text" value={$claimToken} readonly hidden />

  <button
    class="bg-primary-400 hover:bg-primary-300 disabled:opacity-80 text-deep-green-900 font-aeonik font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline flex"
    type="submit"
    formaction="/?/claim"
    disabled={$formSending}
  >
    {$LL.claim.checkClaim()}
    {#if $formSending}
      <Spinner className="ms-2 w-5 h-5 text-primary-200  fill-primary-400 "
      ></Spinner>
      <p class="sr-only">sending form</p>
    {/if}
  </button>
</form>
