<script lang="ts">
  import {
    formModal,
    closeModal,
  } from '$lib/widgets/DOTphin/collectModalStore';
  import ModalWrapper from '$lib/shared/components/ModalWrapper.svelte';
  import Form from './Form.svelte';

  const title = 'Pick an Element';
</script>

<ModalWrapper
  open={$formModal.open}
  size="sm"
  on:close={() => closeModal()}
  autoclose={false}
>
  <svelte:fragment slot="body">
    <div class="text-center px-4 dark:text-gray-200">
      <h2 class="text-3xl font-sans">{title}</h2>
      <p class="text-sm">
        {#if $formModal.action === 'claim'}
          The element will determine the type of DOTphin that will hatch
        {:else if $formModal.action === 'evolve'}
          The element will determine the type of next evolution
        {/if}
      </p>
    </div>
    <div class="pt-1 pb-16">
      <Form action={$formModal.action} />
    </div>
  </svelte:fragment>
</ModalWrapper>
