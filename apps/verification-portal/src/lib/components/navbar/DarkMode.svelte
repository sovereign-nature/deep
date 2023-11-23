<script lang="ts">
  import { Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
  import { getContext } from 'svelte';
  import LL from '$lib/i18n/i18n-svelte';

  export let btnClass: string =
    'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700  text-sm cursor-pointer ';

  export let itemClass =
    'p-0 flex justify-start items-baseline gap-2 dark:hover:bg-transparent cursor-pointer';
  export let ariaLabel: string = 'Dark mode';

  const theme = getContext('theme');
  let selectedTheme: string;
  theme.subscribe((value) => {
    selectedTheme = value;
  });

  let dropdownOpen = false;

  const handleThemeChange = () => {
    theme.setTheme(selectedTheme);
    dropdownOpen = false;
  };
</script>

<button
  aria-label={ariaLabel}
  type="button"
  {...$$restProps}
  class={`${btnClass} px-2`}
>
  {#key selectedTheme}
    {#if selectedTheme === 'system'}
      <slot name="system" />
    {:else if selectedTheme === 'dark'}
      <slot name="dark" />
    {:else}
      <slot name="light" />
    {/if}
  {/key}
</button>

<Dropdown
  bind:open={dropdownOpen}
  containerClass="rounded-sm dark:bg-deep-green  dark:shadow-lg"
>
  <DropdownItem class={itemClass}>
    <Radio
      custom
      class={`${btnClass} m-0 p-0 px-2 py-1`}
      bind:group={selectedTheme}
      on:change={handleThemeChange}
      value={'system'}
    >
      <slot name="system" />
      <span class="ms-1 text-xs"> {$LL.colorTheme.auto()} </span>
    </Radio>
  </DropdownItem>
  <DropdownItem class={itemClass}>
    <Radio
      custom
      class={`${btnClass} m-0 p-0 px-2 py-1`}
      bind:group={selectedTheme}
      on:change={handleThemeChange}
      value={'light'}
    >
      <slot name="light" />
      <span class="ms-1 text-xs"> {$LL.colorTheme.light()} </span>
    </Radio>
  </DropdownItem>
  <DropdownItem class={itemClass}>
    <Radio
      custom
      class={`${btnClass} m-0 p-0 px-2 py-1`}
      bind:group={selectedTheme}
      on:change={handleThemeChange}
      value={'dark'}
    >
      <slot name="dark" />
      <span class="ms-1 text-xs"> {$LL.colorTheme.dark()} </span>
    </Radio>
  </DropdownItem>
</Dropdown>
