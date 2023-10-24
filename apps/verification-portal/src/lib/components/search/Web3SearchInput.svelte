<script>
  import { enhance } from '$app/forms';
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
  import ConnectIcon from '$lib/components/icons/ConnectIcon.svelte';
  import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
  import { Input, ButtonGroup, Button } from 'flowbite-svelte';
  export let network = 'sub0';
  export let placeholder = 'Enter the token ID (1-1466)';
  export let goIcon = false;
  export let inputmode = 'search';
</script>

<form method="POST" use:enhance>
  <div
    class="flex flex-col md:flex-row md:items-center gap-3 lg:px-16 pt-4 sm:pt-6"
  >
    <div
      class="flex gap-2 items-baseline text-white whitespace-nowrap mr-auto text-sm sm:text-base w-full sm:w-auto pe-5 mb-3 md:mb-0"
    >
      Wallet <Button color="none" size="sm" class="bg-primary-300" disabled
        >connect <ConnectIcon className="h-4 w-4 ms-2" /></Button
      > <span>coming soon</span>
    </div>
    <input name="network" value={network} type="text" readonly hidden />
    <ButtonGroup
      divClass="flex flex-col sm:flex-row sm:inline-flex  w-full justify-items-stretch gap-y-4  "
    >
      <Input
        id="default-search"
        class="block border-none w-full border p-4 pl-10 text-sm sm:text-base font-aeonik text-gray-200 focus:border-white focus:ring-white dark:placeholder:text-primary-300 dark:bg-deep-green-700 rounded-sm !rounded-l-sm sm:rounded-none  ms-auto"
        name="search"
        type="search"
        {placeholder}
        required
        {inputmode}
      />

      <Button
        color="none"
        class="bg-primary-300 sm:w-20 border-none !p-2.5 rounded-lg sm:rounded-s-none  ms-auto sm:!rounded-r-sm"
        type="submit"
        aria-label="search"
        formaction="/?/formSearch"
      >
        {#if goIcon}
          <ArrowRight className="h-4 w-4 sm:h-7 sm:w-7" />
        {:else}
          <SearchIcon className="h-4 w-4 sm:h-7 sm:w-7" />
        {/if}
      </Button>
    </ButtonGroup>
  </div>
</form>
