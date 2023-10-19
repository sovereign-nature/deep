<script>
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
  import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
  import { createEventDispatcher } from 'svelte';
  import { Input, ButtonGroup, Button } from 'flowbite-svelte';
  const dispatch = createEventDispatcher();
  let inputValue = '';
  export let network = 'sub0';
  export let placeholder = 'Enter the token ID (1-1466)';
  export let goIcon = false;
  export let inputmode = 'search';
  function handleSubmit(event) {
    event.preventDefault();
    dispatch('search', inputValue);
  }
</script>

<form on:submit={handleSubmit}>
  <ButtonGroup
    divClass="flex flex-col sm:flex-row sm:inline-flex h-20 w-full justify-items-stretch gap-y-4"
  >
    <Input
      id="default-search"
      bind:value={inputValue}
      on:input={handleSubmit}
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
      {#if goIcon}
        <ArrowRight className="h-4 w-4 sm:h-8 sm:w-8" />
      {:else}
        <SearchIcon className="h-4 w-4 sm:h-8 sm:w-8" />
      {/if}
    </Button>
  </ButtonGroup>
</form>
