<script>
  import { enhance } from '$app/forms';
  import ChevronDownIcon from './icons/ChevronDownIcon.svelte';
  import SearchIcon from './icons/SearchIcon.svelte';
  import {
    Input,
    ButtonGroup,
    Button,
    Dropdown,
    DropdownItem,
    Radio,
  } from 'flowbite-svelte';
  let network = 'sub0';
</script>

<form method="POST" use:enhance>
  <!-- Dropdown menu doesn't persist on closed state, bind network value to hidden field before DOM persistance config is available -->
  <input name="network" value={network} type="text" readonly hidden />
  <ButtonGroup
    divClass="flex flex-col sm:flex-row sm:inline-flex h-20 w-full justify-items-stretch gap-y-4"
  >
    <!-- network select -->
    <Button
      color="none"
      class=" flex-shrink-0 flex justify-between  rounded-lg sm:rounded-e-none h-18 sm:h-20 sm:w-32 lg:w-60 text-xl !border-none text-slate-600 bg-gray-100  hover:bg-gray-200 focus:ring-gray-300  "
    >
      <span class="ps-4 capitalize">{network}</span>
      <ChevronDownIcon className="w-3 h-3 " />
    </Button>

    <Dropdown containerClass="overflow-hidden relative " class="p-0 w-64">
      <DropdownItem class="p-0">
        <Radio custom name="network" bind:group={network} value={'sub0'}>
          <span
            class="inline-flex p-4 w-full text-gray-500 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 hover:text-gray-600 dark:text-gray-400"
          >
            sub0
          </span>
        </Radio>
      </DropdownItem>
    </Dropdown>
    <!-- end network select -->

    <Input
      id="default-search"
      class="block border-none w-full border p-4 pl-10 text-xl text-gray-200 focus:border-white focus:ring-white dark:placeholder:text-primary-400 dark:bg-gray-900 rounded-lg sm:rounded-none h-18 sm:h-20 ms-auto"
      name="search"
      type="search"
      placeholder="Search by token ID"
      required
    />

    <Button
      color="none"
      class="bg-primary-400 sm:w-28 border-none !p-2.5 rounded-lg sm:rounded-s-none h-18 sm:h-20 ms-auto"
      type="submit"
      formaction="/?/formSearch"
    >
      <SearchIcon className="h-4 w-4 sm:h-8 sm:w-8" />
    </Button>
  </ButtonGroup>
</form>
