<script lang="ts">
  import { Modal, type SizeType } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';
  export let open = false;
  export let title: string;
  export let autoclose = true;
  export let outsideclose = true;
  export let size: SizeType = 'xs';
  // TODO: possibly use a centralized modal store
  const dispatch = createEventDispatcher();
</script>

<Modal
  bind:open
  on:close={() => dispatch('close')}
  color="none"
  {size}
  {autoclose}
  {outsideclose}
  placement="top-center"
  class="w-full"
  classDialog="z-modal"
  bodyClass="border-none border-deep-green-900 pt-1 h-full overflow-y-auto px-5 mb-4"
  defaultClass="mt-24 md:mt-36  bg-gray-100 dark:bg-deep-green-950 "
  headerClass="bg-gray-100 dark:bg-deep-green-950 flex justify-between items-center p-4 md:p-5 rounded-t-lg"
  backdropClass="fixed inset-0  bg-deep-green   dark:bg-opacity-80 bg-opacity-75 z-modalOverlay"
>
  <svelte:fragment slot="header">
    <h2
      class="font-sans bold font-semibold text-lg w-full text-center text-deep-green dark:text-gray-200"
    >
      {title}
    </h2>
  </svelte:fragment>
  <slot name="body"></slot>
</Modal>
