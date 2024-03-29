<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance, applyAction } from '$app/forms';
  import { toast } from 'svelte-sonner';

  import { getNFTClaimContext } from './context';
  import Spinner from '$lib/components/icons/Spinner.svelte';

  const { claimAddress, claimToken, formSending, claimPending, claimResponse } =
    getNFTClaimContext();

  const checkClaim: SubmitFunction = () => {
    $formSending = true;

    return async ({ result, update }) => {
      switch (result.type) {
        case 'success':
          $claimPending = result?.data?.onChain?.status !== 'success';
          if (!$claimPending) {
            $claimResponse = result.data;
          }
          break;
        case 'failure':
          console.log(result);
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

<form class=" max-w-2xl py-5 text-black" method="POST" use:enhance={checkClaim}>
  <input name="address" type="text" value={$claimAddress} readonly hidden />

  <input name="claim" type="text" value={$claimToken} readonly hidden />

  <button
    class="bg-primary-400 hover:bg-primary-300 disabled:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex"
    type="submit"
    formaction="/?/claim"
    disabled={$formSending}
  >
    Check Status
    {#if $formSending}
      <Spinner className="ms-2 w-5 h-5 text-primary-200  fill-primary-400 "
      ></Spinner>
      <p class="sr-only">sending form</p>
    {/if}
  </button>
</form>
