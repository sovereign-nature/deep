<script>
  import ModalWrapper from '$lib/shared/components/ModalWrapper.svelte';

  import { Label, Checkbox } from 'flowbite-svelte';
  let formModal = false;
  const title = '      Get A Free DOTphin Proof';
</script>

<button
  type="button"
  class="sni-primary-btn !text-sm !font-bold"
  on:click={() => (formModal = true)}>Get A Free Proof</button
>
<ModalWrapper
  open={formModal}
  on:close={() => (formModal = false)}
  {title}
  autoclose={true}
>
  <svelte:fragment slot="body">
    <form class="flex flex-col space-y-6" action="#">
      <Label class="space-y-2">
        <span>Email</span>
        <input
          type="email"
          name="email"
          placeholder="name@company.com"
          required
          class="sni-input"
        />
      </Label>

      <div class="flex items-start">
        <Checkbox>Consent to XYZ</Checkbox>
      </div>
      <button type="submit" class="sni-submit-btn w-full">Claim Proof</button>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        <a
          href="/"
          class="text-primary-700 hover:underline dark:text-primary-400"
        >
          Read more about Dotphin
        </a>
      </div>
    </form>
  </svelte:fragment>
</ModalWrapper>
