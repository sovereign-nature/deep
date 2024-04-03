<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { Button, ButtonGroup, Input } from 'flowbite-svelte';
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
  import { updateQueryParams } from '$lib/shared/utils';
  import { LL } from '$lib/shared/i18n/i18n-svelte';

  export let placeholder = $LL.web2.search.placeholder();
  export let inputmode = 'text';
  export let searchEnabled = true;

  // Retrieve user store from context
  const search: Writable<string> = getContext('search');
  const results: Writable<string> = getContext('results');

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
  function handleSubmit(e: Event) {
    e.preventDefault();

    focusElement();
  }
  function onEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const inputElement = e.target as HTMLInputElement;
      if (inputElement) {
        inputElement.blur();
      }
    }
  }
</script>

<form class="relative" on:submit={handleSubmit}>
  <div
    class="flex flex-col md:flex-row items-center gap-3 lg:px-16 pt-4 sm:pt-6"
  >
    <span
      class="text-white whitespace-nowrap mr-auto text-sm sm:text-base w-full sm:w-auto pe-5"
    >
      {$LL.web2.search.label()}
      {#if $search.length > 0}
        <span class="float-right sm:hidden"
          >{$LL.results.nrResults($results.length)}</span
        >
      {/if}
    </span>

    <ButtonGroup
      divClass="relative w-full flex flex-col  sm:flex-row sm:inline-flex  justify-items-stretch gap-y-4  sm:flex-row sm:inline-flex  justify-items-stretch gap-y-4 "
    >
      <Input
        id="web2-search"
        bind:value={$search}
        on:input={() => updateQueryParams('search', $search)}
        on:keyup={onEnter}
        class="block border-none w-full border p-4 pe-14 sm:pe-4 xl:pl-10  text-lg font-aeonik text-gray-200 !ring-inset focus:border-primary focus:ring-primary-300 dark:placeholder:text-primary-300 dark:bg-deep-green-700 rounded-lg sm:!rounded-l-sm sm:rounded-none  ms-auto"
        {placeholder}
        {inputmode}
        disabled={!searchEnabled}
        type="search"
        required
      />

      <Button
        type="submit"
        color="none"
        class="bg-primary-300 sm:w-20 border-none !p-2.5 rounded-lg sm:rounded-s-none  ms-auto sm:!rounded-r-sm absolute top-1/2 right-3 sm:right-0 transform -translate-y-1/2 sm:translate-y-0  sm:relative"
        aria-label="search"
      >
        <SearchIcon className="h-4 w-4 sm:h-7 sm:w-7" />
      </Button>
    </ButtonGroup>
  </div>
</form>
