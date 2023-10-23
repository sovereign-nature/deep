<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { Input, ButtonGroup, Button } from 'flowbite-svelte';
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
  import { updateQueryParams } from '$lib/utils';

  export let placeholder = 'Search)';
  export const inputmode = 'search';

  // Retrieve user store from context
  const search: Writable<string> = getContext('search');
  const results: Writable<string> = getContext('results');

  function updateParams() {
    updateQueryParams('search', $search);
  }
  // Replace 'your-element-id' with the actual ID of the element you want to focus on

  function focusElement() {
    let elementId = 'search-results';
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      console.log(`Element with ID '${elementId}' not found.`);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    focusElement();
  }
  function onEnter(e) {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  }
</script>

<form on:submit={handleSubmit}>
  <div
    class="flex flex-col md:flex-row items-center gap-3 lg:px-16 pt-4 sm:pt-6"
  >
    <span
      class="text-white whitespace-nowrap mr-auto text-sm sm:text-base w-full sm:w-auto pe-5"
      >Search for your asset
      {#if $search.length > 0}
        <span class="float-right sm:hidden">{$results.length} results</span>
      {/if}
    </span>

    <ButtonGroup
      divClass="flex flex-col sm:flex-row sm:inline-flex  w-full justify-items-stretch gap-y-4  "
    >
      <Input
        id="web2-search"
        bind:value={$search}
        on:input={updateParams}
        on:keyup={onEnter}
        class="block border-none w-full border p-4 pl-10 text-sm sm:text-base font-aeonik text-gray-200 focus:border-white focus:ring-white dark:placeholder:text-primary-300 dark:bg-deep-green-700 rounded-sm !rounded-l-sm sm:rounded-none  ms-auto"
        {placeholder}
        type="search"
        required
      />

      <Button
        type="submit"
        color="none"
        class="bg-primary-300 sm:w-20 border-none !p-2.5 rounded-lg sm:rounded-s-none  ms-auto sm:!rounded-r-sm"
        aria-label="search"
      >
        <SearchIcon className="h-4 w-4 sm:h-7 sm:w-7" />
      </Button>
    </ButtonGroup>
  </div>
</form>
