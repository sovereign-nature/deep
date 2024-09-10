<script lang="ts">
  import {
    formModal,
    closeModal,
  } from '$lib/widgets/DOTphin/collectModalStore';
  import ModalWrapper from '$lib/shared/components/ModalWrapper.svelte';

  import Form from './Form.svelte';

  const title = 'Select the element';
</script>

<ModalWrapper
  open={$formModal}
  on:close={() => closeModal()}
  {title}
  autoclose={false}
>
  <svelte:fragment slot="body">
    <Form />
  </svelte:fragment>
</ModalWrapper>
