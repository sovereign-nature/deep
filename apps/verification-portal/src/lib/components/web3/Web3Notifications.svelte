<script lang="ts">
  import RolloverBtn from '$lib/components/RolloverBtn.svelte';
  import BellIcon from '$lib/components/icons/BellIcon.svelte';
  import { LL } from '$lib/i18n/i18n-svelte';

  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';

  let isLoaded = false;
  let hasNew = false;

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
      <RolloverBtn type="alert" {hasNew}>
        {$LL.notifications.seeAll()}
        <span slot="icon"> <BellIcon className="h-5 w-5 mx-1"></BellIcon></span>
      </RolloverBtn>
    {/key}
  {/if}
{/if}
