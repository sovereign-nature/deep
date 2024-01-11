<script lang="ts">
  import RolloverBtn from '$lib/components/RolloverBtn.svelte';
  import BellIcon from '$lib/components/icons/BellIcon.svelte';
  import { LL } from '$lib/i18n/i18n-svelte';
  import { isFeatureEnabled } from '$lib/utils';
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';

  let isLoaded = false;
  export let placeholder = $LL.notifications.subscribe();

  const web3Connected: Writable<boolean> = getContext('web3Connected');
  const web3Address: Writable<string> = getContext('web3Address');
  const web3ChainId: Writable<number> = getContext('web3ChainId');
  const openInboxModal: Writable<boolean> = getContext('web3InboxModalOpen');

  onMount(async () => {
    isLoaded = true;
  });
</script>

{#if isFeatureEnabled('notificationsEnabled')}
  {#if isLoaded}
    {#if $web3Connected}
      {#key $web3Address || $web3ChainId}
        <RolloverBtn
          type="alert"
          keepOpen
          on:click={() => ($openInboxModal = true)}
        >
          {placeholder}<span slot="icon">
            <BellIcon className="h-5 w-5 "></BellIcon></span
          >
        </RolloverBtn>
      {/key}
    {/if}
  {/if}
{/if}
