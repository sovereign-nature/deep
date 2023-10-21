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
  <!-- Dropdown menu doesn't persist on closed state, bind network value to hidden field before DOM persistance config is available -->
  <input name="network" value={network} type="text" readonly hidden />
  <ButtonGroup
    divClass="flex flex-col sm:flex-row sm:inline-flex h-20 w-full justify-items-stretch gap-y-4"
  >
    <Input
      id="default-search"
      class="block border-none w-full border p-4 pl-10 text-base font-aeonik text-gray-200 focus:border-white focus:ring-white dark:placeholder:text-primary-400 dark:bg-deep-green-950 rounded-lg sm:rounded-none h-18 sm:h-20 ms-auto"
      name="search"
      type="search"
      {placeholder}
      required
      {inputmode}
    />

    <Button
      color="none"
      class="bg-primary-400 sm:w-28 border-none !p-2.5 rounded-lg sm:rounded-s-none h-18 sm:h-20 ms-auto"
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
</form>
