<script>
  import { enhance } from '$app/forms';
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
  import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
  import { Input, ButtonGroup, Button } from 'flowbite-svelte';
  export let network = 'sub0';
  export let placeholder = 'Enter the token ID (1-1466)';
  export let goIcon = false;
  export let inputmode = 'search';
</script>

<form method="POST" use:enhance>
  <div
    class="flex flex-col sm:flex-row items-center gap-3 lg:px-16 pt-4 sm:pt-6"
  >
    <span
      class="text-white whitespace-nowrap mr-auto text-sm sm:text-base w-full sm:w-auto"
      >Search for your asset
    </span>
    <input name="network" value={network} type="text" readonly hidden />
    <ButtonGroup
      divClass="flex flex-col sm:flex-row sm:inline-flex  w-full justify-items-stretch gap-y-4  "
    >
      <Input
        id="default-search"
        class="block border-none w-full border p-4 pl-10 text-base font-aeonik text-gray-200 focus:border-white focus:ring-white dark:placeholder:text-primary-400 dark:bg-deep-green-700 rounded-sm !rounded-l-sm sm:rounded-none  ms-auto"
        name="search"
        type="search"
        {placeholder}
        required
        {inputmode}
      />

      <Button
        color="none"
        class="bg-primary-300 sm:w-28 border-none !p-2.5 rounded-lg sm:rounded-s-none  ms-auto sm:!rounded-r-sm"
        type="submit"
        aria-label="search"
        formaction="/?/formSearch"
      >
        {#if goIcon}
          <ArrowRight className="h-4 w-4 sm:h-8 sm:w-8" />
        {:else}
          <SearchIcon className="h-4 w-4 sm:h-8 sm:w-8" />
        {/if}
      </Button>
    </ButtonGroup>
  </div>
</form>
