<script>
  import { enhance } from '$app/forms';
  import {
    Input,
    ButtonGroup,
    Button,
    Dropdown,
    DropdownItem,
    Radio,
  } from 'flowbite-svelte';
  let network = 'Sub0';
  import { ChevronDownSolid, SearchOutline } from 'flowbite-svelte-icons';
</script>

<form method="POST" use:enhance>
  <ButtonGroup class="w-full h-20">
    <!-- network select -->
    <Button
      color="none"
      class=" flex-shrink-0 flex justify-between  w-32 lg:w-60 text-xl !border-none text-slate-600 bg-gray-100  hover:bg-gray-200 focus:ring-gray-300  "
    >
      <span class="ps-4">{network}</span>
      <ChevronDownSolid class="w-3 h-3 " />
    </Button>
    <Dropdown containerClass="overflow-hidden relative " class="p-0 w-48">
      <DropdownItem class="p-0">
        <Radio custom name="network" bind:group={network} value={'Sub0'}>
          <span
            class="inline-flex p-4 w-full text-gray-500 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 hover:text-gray-600 dark:text-gray-400"
          >
            Sub0
          </span>
        </Radio>
      </DropdownItem>
      <DropdownItem class="p-0 "
        ><Radio
          custom
          name="network"
          bind:group={network}
          value={'Hotel Hideaway'}
          disabled
          class="cursor-not-allowed opacity-50"
        >
          <span
            class="inline-flex p-4 w-full text-gray-500 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 dark:text-gray-500"
          >
            Hotel Hideaway
          </span>
        </Radio>
      </DropdownItem>
    </Dropdown>
    <!-- end network select -->

    <Input
      id="default-search"
      name="search"
      type="search"
      placeholder="Search by asset name, address or ID.."
      required
      class="block border-none w-full border p-4 pl-10 text-xl text-gray-200 focus:border-white focus:ring-white dark:placeholder:text-primary-400 dark:bg-gray-900"
    />

    <Button
      color="none"
      class="bg-primary-400 w-28 border-none !p-2.5"
      type="submit"
    >
      <SearchOutline class="w-8 h-8" />
    </Button>
  </ButtonGroup>
</form>
