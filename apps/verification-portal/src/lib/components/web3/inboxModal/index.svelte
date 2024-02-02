<script lang="ts">
  import { CloseButton, Modal } from 'flowbite-svelte';
  import type { SizeType } from 'flowbite-svelte';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  import { flip } from 'svelte/animate';
  import type { NotifyClientTypes } from '@walletconnect/notify-client';
  import { formatDistanceToNowStrict } from 'date-fns';
  import { deleteMessage, updateScopes } from '$lib/web3Inbox';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import Info from '$lib/shared/typography/Info.svelte';
  import Spinner from '$lib/components/icons/Spinner.svelte';
  import CogIcon from '$lib/components/icons/CogIcon.svelte';
  import ArrowBackIcon from '$lib/components/icons/ArrowBackIcon.svelte';
  import BellIcon from '$lib/components/icons/BellIcon.svelte';
  import DeleteMessage from '$lib/components/web3/inboxModal/DeleteMsg.svelte';

  let showSettings = false;
  let openToast = false;
  let size: SizeType = 'sm';
  let notifications: NotifyClientTypes.NotifyMessageRecord[] = [];
  let notificationTypes: NotifyClientTypes.ScopeMap[] = [];
  let triggerToast: () => Promise<void>;
  let scopes: string[] = [];
  let updatingPreferences = false;
  let preferencesChanged = false;

  const web3Types: Writable<NotifyClientTypes.ScopeMap[]> =
    getContext('web3InboxTypes');
  const web3Messages: Writable<NotifyClientTypes.NotifyMessageRecord[]> =
    getContext('web3InboxMessages');
  const openInboxModal: Writable<boolean> = getContext('web3InboxModalOpen');

  $: $web3Messages, (notifications = $web3Messages);
  $: $web3Types, updateTypesAndScope();

  function updateTypesAndScope() {
    notificationTypes = $web3Types;
    if ($web3Types) {
      scopes = $web3Types.filter((type) => type.enabled).map((type) => type.id);
    }
    updatingPreferences = false;
    preferencesChanged = false;
  }
  function closeNotification(id: number) {
    deleteMessage(id);
    triggerToast();
  }

  function findNotificationTypeByTopic(topic: string) {
    if (!notificationTypes) return;
    const type = notificationTypes.find((type) => type.id === topic);
    return type;
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

{#if $openInboxModal !== undefined}
  <div
    class="fixed top-12 left-1/2 transform -translate-x-1/2 z-50"
    style="z-index: 100;"
  >
    <DeleteMessage bind:openToast bind:show={triggerToast}></DeleteMessage>
  </div>
  <Modal
    placement="top-center"
    defaultClass="mt-36 relative max-h-[calc(80vh-4rem)] overflow-hidden"
    class=" bg-deep-green-800 dark:bg-deep-green-950 text-white border-none rounded-xl"
    bodyClass="border-top-1 border-deep-green-900 h-full overflow-y-auto "
    scrollable
    color="none"
    outsideclose={true}
    bind:open={$openInboxModal}
    {size}
  >
    <svelte:fragment slot="header">
      <div class="text-center w-full">
        <h2 class="font-sans bold font-semibold text-lg">
          {$LL.notifications.notificationCenter()}
        </h2>
      </div>
      <button
        class="text-white w-6 h-6 p-1 bg-gray-200 bg-transperency-50 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-50"
        on:click={() => {
          showSettings = !showSettings;
        }}
      >
        {#if showSettings}
          <ArrowBackIcon />
        {:else}
          <CogIcon />
        {/if}
      </button>
    </svelte:fragment>

    {#if showSettings}
      {#key notificationTypes}
        <div class="flex flex-col gap-5 pb-16">
          <div class="flex flex-col justify-between">
            <h4 class="font-sans">
              {$LL.notifications.notificationSettings()}
            </h4>

            <div
              class="flex flex-col items-start justify-start gap-5 text-white"
            >
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
    {:else}
      <div class="flex flex-col gap-5 pb-16">
        {#if notifications && notifications.length > 0}
          {#each notifications as notification (notification.id)}
            <div
              animate:flip={{ duration: 300 }}
              class="Notification-card bg-gray-100/90 hover:bg-gray-100 text-deep-green-950 dark:text-white dark:bg-deep-green-300/80 dark:hover:bg-deep-green-300 p-5 pt-4 rounded-xl"
            >
              <div class="flex flex-row justify-end items-end ms-16 ps-1 pb-3">
                {#if findNotificationTypeByTopic(notification.message.type)}
                  <span
                    class="font-light flex gap-2 me-auto items-center text-sm"
                  >
                    {findNotificationTypeByTopic(notification.message.type)
                      .name}
                    <Info className="w-4 h-4 opacity-40"
                      >{findNotificationTypeByTopic(notification.message.type)
                        .description}</Info
                    >
                  </span>
                {/if}
                <div class="flex flex-col justify-start items-end opacity-40">
                  <CloseButton
                    on:click={() => closeNotification(notification.id)}
                  />
                </div>
              </div>
              <div class="flex flex-row justify-between">
                <div class="flex flex-row gap-x-3">
                  <div class="flex flex-col flex-shrink-0 justify-start me-2">
                    {#if notification.message.icon === 'https://cdn.iconscout.com/icon/free/png-256/ethereum-1-283135.png'}
                      <img
                        alt={notification.message.title}
                        src="https://cdn.iconscout.com/icon/free/png-256/ethereum-1-283135.png"
                        class="w-12 h-12 rounded-full object-cover aspect-square"
                      />
                    {:else}
                      <div
                        class="w-12 h-12 founded-full bg-orange-400 text-white aspect-square flex justify-center items-center rounded-full"
                      >
                        <BellIcon className="w-6 h-6" />
                      </div>
                    {/if}
                  </div>
                  <div class="flex flex-col justify-center gap-2 text-sm">
                    <h3 class="font-sans text-lg font-semibold">
                      {notification.message.title}
                    </h3>

                    <p class="text-lg">
                      {notification.message.body}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex flex-row justify-end items-end ms-16 ps-1 mt-2">
                {#if notification.message.url}
                  <a
                    href={notification.message.url}
                    target="_blank"
                    class="text-sm text-primary-300 me-auto dark:text-primary-200 truncate w-1/2"
                  >
                    {notification.message.url}
                  </a>
                {/if}
                <p class="text-italic text-xs text-start italic opacity-30">
                  {formatDistanceToNowStrict(notification.publishedAt, {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          {/each}
        {:else}
          <span>{$LL.notifications.notFound()}</span>
        {/if}
      </div>
    {/if}
  </Modal>
{/if}
