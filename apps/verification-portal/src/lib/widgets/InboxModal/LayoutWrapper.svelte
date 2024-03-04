<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Modal } from 'flowbite-svelte';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import CogIcon from '$lib/components/icons/CogIcon.svelte';
  import ArrowBackIcon from '$lib/components/icons/ArrowBackIcon.svelte';
  import ContentSlider from '$lib/shared/components/ContentSlider.svelte';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  const openInboxModal: Writable<boolean> = getContext('web3InboxModalOpen');

  export let toggleTabValue = true;
  let settingsTab: HTMLElement;

  const toggleTabs = () => {
    toggleTabValue = !toggleTabValue;
  };
  const controlBtnClass =
    'me-auto text-white w-6 h-6 p-1 bg-gray-200/[.06] rounded-full hover:bg-gray-300/[.3] dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-50';
  // hide settings tab on modal close
  $: $openInboxModal,
    (toggleTabValue = $openInboxModal === false ? true : toggleTabValue);
</script>

<Modal
  placement="top-center"
  defaultClass="mt-5 md:mt-36 relative md:max-h-[calc(80vh-4rem)] max-w-full md:max-w-xl overflow-hidden mx-auto"
  class=" bg-deep-green-800 dark:bg-deep-green-950 text-white border-none rounded-xl"
  bodyClass="border-none border-deep-green-900 pt-1 h-full overflow-y-auto "
  color="none"
  outsideclose={true}
  bind:open={$openInboxModal}
>
  <svelte:fragment slot="header">
    <header class="flex flex-row justify-center items-start w-full px-2">
      <button class={controlBtnClass} on:click={toggleTabs}>
        {#if toggleTabValue}
          <CogIcon />
        {:else}
          <ArrowBackIcon />
        {/if}
      </button>
      <slot name="title" />
    </header>
  </svelte:fragment>
  {#if toggleTabValue}
    <ContentSlider
      titleTab1=" {$LL.notifications.titleNewTab()}"
      titleTab2=" {$LL.notifications.titleArchiveTab()}"
    >
      <svelte:fragment slot="controls">
        <slot name="controls" />
      </svelte:fragment>
      <svelte:fragment slot="controls-tab1">
        <slot name="controls-tab1" />
      </svelte:fragment>
      <svelte:fragment slot="controls-tab2">
        <slot name="controls-tab2" />
      </svelte:fragment>
      <svelte:fragment slot="tab1">
        <slot name="tab1" />
      </svelte:fragment>
      <svelte:fragment slot="tab2">
        <slot name="tab2" />
      </svelte:fragment>
    </ContentSlider>
  {:else}
    <div
      class="h-96 p-4 overflow-hidden"
      bind:this={settingsTab}
      on:outrostart={() => settingsTab.classList.add('absolute')}
      on:introstart={() => settingsTab.classList.remove('absolute')}
      in:fade={{ duration: 200 }}
    >
      <div class="h-inherit overflow-x-hidden overflow-y-auto w-full relative">
        <slot name="settings" />
      </div>
    </div>
  {/if}
</Modal>
