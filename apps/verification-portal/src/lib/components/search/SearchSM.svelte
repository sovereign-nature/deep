<script>
  import { Input, ButtonGroup, Button } from 'flowbite-svelte';
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
  import { Modal } from 'flowbite-svelte';
  import SearchTabs from '$lib/containers/SearchTabs.svelte';

  let defaultModal = false;
</script>

<div
  class="w-full"
  on:click={() => (defaultModal = true)}
  on:keydown={(e) => {
    if (e.key === 'Enter') {
      defaultModal = true;
    }
  }}
  role="searchbox"
  tabindex="0"
>
  <ButtonGroup
    class="w-full opacity-50 hover:opacity-100 active:opacity-100 transition-opacity"
  >
    <Input
      readonly
      placeholder="Search by token ID or name"
      class="block !rounded-s-sm border-none w-full border p-2 pl-10 text-sm text-gray-200 focus:border-white focus:ring-white dark:placeholder:text-gray-500 dark:bg-primary-800"
    />
    <Button
      color="none"
      class="bg-gray-200 dark:bg-primary-500 w-16 border-none !rounded-e-sm"
      aria-label="search"
    >
      <SearchIcon className="h-4 w-4 text-white dark:text-deep-green"
      ></SearchIcon>
    </Button>
  </ButtonGroup>
</div>
<div class="dark">
  <Modal
    type="undefined"
    bind:open={defaultModal}
    size="xl"
    backdropClass="fixed inset-0 z-40 bg-deep-green-950 bg-opacity-90"
    placement="top-center"
    bodyClass="bg-deep-green-900 min-h-[70vh] text-dark"
  >
    <SearchTabs></SearchTabs>
  </Modal>
</div>
