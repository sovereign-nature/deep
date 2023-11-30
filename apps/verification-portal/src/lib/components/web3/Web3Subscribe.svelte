<script lang="ts">
  import RolloverBtn from '$lib/components/RolloverBtn.svelte';
  import BellIcon from '../icons/BellIcon.svelte';
  import { LL } from '$lib/i18n/i18n-svelte';

  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';

  let isLoaded = false;
  export let placeholder = $LL.notifications.subscribe();

  const web3Connected: Writable<boolean> = getContext('web3Connected');
  const web3Address: Writable<string> = getContext('web3Address');
  const web3ChainId: Writable<number> = getContext('web3ChainId');

  onMount(async () => {
    isLoaded = true;
  });
</script>

{#if isLoaded}
  {#if $web3Connected}
    {#key $web3Address || $web3ChainId}
      <RolloverBtn type="alert" keepOpen>
        {placeholder}<span slot="icon">
          <BellIcon className="h-5 w-5 "></BellIcon></span
        >
      </RolloverBtn>
    {/key}
  {/if}
{/if}
