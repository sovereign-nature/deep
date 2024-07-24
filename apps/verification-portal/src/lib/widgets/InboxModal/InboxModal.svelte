<script lang="ts">
  import InboxModalWrapper from '$lib/widgets/InboxModal/LayoutWrapper.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import SettingsTab from '$lib/widgets/InboxSettingsList/SettingsList.svelte';
  import CallbackBtn from '$lib/shared/components/CallbackBtn.svelte';
  import NotificationList from '$lib/widgets/InboxNotificationList/NotificationList.svelte';
  import { markAllRead } from '$lib/features/web3InboxNotifications';
  import Info from '$lib/shared/typography/Info.svelte';
  let isPending = false;
  async function markAsRead() {
    isPending = true;
    await markAllRead().finally(() => {
      isPending = false;
    });
  }
</script>

<InboxModalWrapper>
  <svelte:fragment slot="title">
    <h2 class="font-sans bold font-semibold text-lg w-full text-center">
      {$LL.notifications.notificationCenter()}
      <Info className="w-4 h-4 opacity-40 inline-block ms-2 mb-1">
        Web3Inbox is still under development, new functionality coming soon!</Info
      >
    </h2>
  </svelte:fragment>
  <div slot="controls-tab1" class="flex flex-row items-center gap-3">
    <CallbackBtn
      {isPending}
      on:click={markAsRead}
      className="flex flex-row items-center bg-deep-green-600 text-primary-300 text-sm px-4 rounded-lg h-9"
    >
      {$LL.notifications.markAllRead()}</CallbackBtn
    >
  </div>

  <div slot="tab1">
    <NotificationList />
  </div>
  <div slot="tab2">
    <span>Archive functionality coming soon!</span>
  </div>

  <svelte:fragment slot="settings">
    <SettingsTab />
  </svelte:fragment>
</InboxModalWrapper>
