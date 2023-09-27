<script>
  import { enhance } from '$app/forms';
  import { Input, ButtonGroup, Button } from 'flowbite-svelte';
  import SearchIcon from './icons/SearchIcon.svelte';
</script>

<form class="w-full" method="POST" use:enhance>
  <ButtonGroup
    class="w-full opacity-50 hover:opacity-100 active:opacity-100 transition-opacity"
  >
    <Input
      id="default-search"
      name="search"
      type="search"
      placeholder="Search by token ID"
      required
      class="block !rounded-s-sm border-none w-full border p-2 pl-10 text-sm text-gray-200 focus:border-white focus:ring-white dark:placeholder:text-gray-500 dark:bg-primary-800"
    />
    <Button
      color="none"
      class="bg-gray-200 dark:bg-primary-500 w-16 border-none !rounded-e-sm"
      type="submit"
      aria-label="search"
      formaction="/?/formSearch"
    >
      <SearchIcon className="h-4 w-4 text-white dark:text-deep-green"
      ></SearchIcon>
    </Button>
  </ButtonGroup>
</form>
