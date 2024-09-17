<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import CloseIcon from '$lib/components/icons/CloseIcon.svelte';
  const dispatch = createEventDispatcher();
</script>

<button
  type="button"
  on:click={() => dispatch('click')}
  data-umami-event="nft-claim-close"
  class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-200 hover:text-white focus:outline-none whitespace-normal m-0.5 rounded-lg focus:ring-2 p-1.5 ms-auto flex items-center justify-center text-sm"
  ><span class="sr-only">Close claim modal</span>
  <CloseIcon className="w-5 h-5" />
</button>
