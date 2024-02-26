<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  import type { NotifyClientTypes } from '@walletconnect/notify-client';
  import { updateScopes } from '$lib/features/web3Inbox';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import Toggle from '$lib/shared/forms/Toggle.svelte';
  import Spinner from '$lib/components/icons/Spinner.svelte';

  let notificationTypes: NotifyClientTypes.ScopeMap[] = [];
  let scopes: string[] = [];
  let updatingPreferences = false;
  let preferencesChanged = false;

  const web3Types: Writable<NotifyClientTypes.ScopeMap[]> =
    getContext('web3InboxTypes');

  $: $web3Types, updateTypesAndScope();

  function updateTypesAndScope() {
    notificationTypes = $web3Types;
    if ($web3Types) {
      scopes = $web3Types.filter((type) => type.enabled).map((type) => type.id);
    }
    updatingPreferences = false;
    preferencesChanged = false;
  }

  // Toggle preference
  async function toggleScopePreference(id: string) {
    preferencesChanged = true;
    if (scopes.includes(id)) {
      scopes = scopes.filter((typeId) => typeId !== id);
    } else {
      scopes = [...scopes, id];
    }
  }
  function savePreferences() {
    updatingPreferences = true;
    updateScopes(scopes);
  }
</script>

{#key notificationTypes}
  <div class="flex flex-col gap-5 pb-16">
    <div class="flex flex-col justify-between">
      <h4 class="font-sans">
        {$LL.notifications.notificationSettings()}
      </h4>

      <div class="flex flex-col items-start justify-start gap-5 text-white">
        {#if notificationTypes && notificationTypes.length > 0}
          {#each notificationTypes as type (type.id)}
            <Toggle
              checked={type.enabled}
              disabled={updatingPreferences}
              color="green"
              toggleFunction={() => toggleScopePreference(type.id)}
            >
              <div class="flex flex-col">
                <span class="text-white font-semibold">{type.name}</span>
                <span class="text-white">
                  {type.description}
                </span>
              </div>
            </Toggle>
          {/each}
        {/if}
        <button
          disabled={updatingPreferences || !preferencesChanged}
          class="btn mt-5 bg-primary-400 disabled:bg-primary-500 hover:bg-primary-300 rounded-sm px-5 py-3 font-aeonik text-sm"
          on:click={savePreferences}
        >
          <span class="flex flex-row gap-3">
            {$LL.notifications.savePreferences()}
            {#if updatingPreferences}
              <Spinner className="h-5 w-5 text-primary-500 fill-gray-200"
              ></Spinner>
            {/if}
          </span>
        </button>
      </div>
    </div>
  </div>
{/key}
