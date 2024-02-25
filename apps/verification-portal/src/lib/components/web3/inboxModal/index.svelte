<script lang="ts">
  import InboxModalWrapper from '$lib/components/web3/inboxModal/InboxModalWrapper.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import InboxSettings from './InboxModalSettings.svelte';
  import NotificationList from './NotificationList.svelte';
  import Info from '$lib/shared/typography/Info.svelte';
</script>

<InboxModalWrapper>
  <svelte:fragment slot="title">
    <h2 class="font-sans bold font-semibold text-lg w-full text-center">
      {$LL.notifications.notificationCenter()}
      <Info className="w-4 h-4 opacity-40 inline-block ms-2">
        Web3Inbox is still under development, new functionality coming soon!</Info
      >
    </h2>
  </svelte:fragment>
  <div slot="controls-tab1" class="flex flex-row items-center gap-3">
    <button
      class="disabled cursor-not-allowed opacity-50 flex flex-row items-center bg-deep-green-600 text-primary-300 text-sm px-4 rounded-lg h-9"
    >
      mark all read</button
    >
  </div>

  <div slot="tab1">
    <NotificationList isRead={false} />
  </div>
  <div slot="tab2">
    <NotificationList isRead={true} />
  </div>

  <svelte:fragment slot="settings">
    <InboxSettings />
  </svelte:fragment>
</InboxModalWrapper>
