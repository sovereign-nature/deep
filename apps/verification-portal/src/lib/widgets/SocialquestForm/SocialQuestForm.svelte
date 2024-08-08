<script>
  import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
  let formModal = false;
</script>

<Button
  class=" bg-primary-400 dark:bg-primary-400 dark:hover:bg-primary-300 font-aeonik  text-white rounded-full"
  on:click={() => (formModal = true)}>Get Free Proof</Button
>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Get Free DOTphin Proof
    </h3>
    <Label class="space-y-2">
      <span>Email</span>
      <Input
        type="email"
        name="email"
        placeholder="name@company.com"
        required
      />
    </Label>

    <div class="flex items-start">
      <Checkbox>Consent to XYZ</Checkbox>
    </div>
    <Button
      color="alternative"
      type="submit"
      class="w-full bg-primary-400 dark:bg-primary-400 dark:hover:bg-primary-300 font-aeonik text-base text-white dark:text-white rounded-full"
      >Claim Proof</Button
    >
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
      <a
        href="/"
        class="text-primary-700 hover:underline dark:text-primary-500"
      >
        Read more about Dotphin
      </a>
    </div>
  </form>
</Modal>
