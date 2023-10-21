<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { Input, ButtonGroup, Button } from 'flowbite-svelte';
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
  import { updateQueryParams } from '$lib/utils';

  export let placeholder = 'Search)';
  export let inputmode = 'search';

  // Retrieve user store from context
  const search: Writable<string> = getContext('search');

  function updateParams() {
    updateQueryParams('search', $search);
  }

  function handleSubmit(event) {
    event.preventDefault();
    //@TODO add focus
  }
</script>

<form on:submit={handleSubmit}>
  <ButtonGroup
    divClass="flex flex-col sm:flex-row sm:inline-flex h-20 w-full justify-items-stretch gap-y-4"
  >
    <Input
      id="default-search"
      bind:value={$search}
      on:input={updateParams}
      class="block border-none w-full border p-4 pl-10 text-base font-aeonik text-gray-200 focus:border-white focus:ring-white dark:placeholder:text-primary-400 dark:bg-deep-green-950 rounded-lg sm:rounded-none h-18 sm:h-20 ms-auto"
      {placeholder}
      type="search"
      {inputmode}
      required
    />

    <Button
      type="submit"
      color="none"
      class="bg-primary-400 sm:w-28 border-none !p-2.5 rounded-lg sm:rounded-s-none h-18 sm:h-20 ms-auto"
      aria-label="search"
    >
      <SearchIcon className="h-4 w-4 sm:h-8 sm:w-8" />
    </Button>
  </ButtonGroup>
</form>
