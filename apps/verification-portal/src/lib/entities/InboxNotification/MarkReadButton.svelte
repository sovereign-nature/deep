<script lang="ts">
  export let isPending = false;
  import { Tooltip } from 'flowbite-svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';

  import CheckMark from '$lib/components/icons/CheckMark.svelte';
  import Spinner from '$lib/components/icons/Spinner.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>

{#if !isPending}
  <button
    on:click={() => dispatch('click')}
    class="rounded-full text-semibold transition-all text-deep-green-400 hover:text-white bg-primary-400 hover:bg-primary-300 w-5 h-5"
  >
    <CheckMark className="h-5 w-5" />
  </button>
{:else}
  <Spinner className="h-5 w-5 fill-gray-500 text-white" />
{/if}
<Tooltip placement="left" class="text-center p-4 z-50 break-all"
  >{$LL.notifications.markAsRead()}</Tooltip
>
