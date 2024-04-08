<script lang="ts">
  import { Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
  import LL from '$lib/shared/i18n/i18n-svelte';
  import RolloverBtn from '$lib/shared/components/RolloverBtn.svelte';
  import { themeStore, setTheme } from '$lib/features/themeSwitch';
  import type { Theme } from '$lib/features/themeSwitch';
  export const btnClass: string =
    ' text-gray-500 dark:text-gray-400  hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700  cursor-pointer ';

  export let itemClass =
    'dark:bg-transparent p-0 mb-1 flex w-full items-baseline gap-2 text-primary-500 hover:text-primary-400 dark:text-primary-400 hover:dark:text-white dark:hover:bg-primary-400 bg-gray-100 dark:bg-primary-800 w-44 cursor-pointer px-2  rounded-full';
  const radioClass =
    'm-0 p-0 px-2 py-2 w-full text-base bg-transparent text-inherit';
  export let containerClass: string;
  let selectedTheme: string | undefined;

  $: selectedTheme = $themeStore;

  let dropdownOpen = false;
  const handleThemeChange = () => {
    setTheme(selectedTheme as Theme);

    dropdownOpen = false;
  };
</script>

<RolloverBtn
  type="secondary"
  keepOpen={dropdownOpen}
  customBtnClass={`${containerClass} theme-rollover  flex items-center `}
  customLabelClass="w-28 text-start"
>
  {#key selectedTheme}
    {#if selectedTheme === 'system'}
      {$LL.colorTheme.auto()}
    {:else if selectedTheme === 'dark'}
      {$LL.colorTheme.dark()}
    {:else}
      {$LL.colorTheme.light()}
    {/if}
  {/key}
  <span slot="icon">
    {#key selectedTheme}
      {#if selectedTheme === 'system'}
        <slot name="system" />
      {:else if selectedTheme === 'dark'}
        <slot name="dark" />
      {:else}
        <slot name="light" />
      {/if}
    {/key}
  </span>
</RolloverBtn>

<Dropdown
  triggeredBy=".theme-rollover"
  bind:open={dropdownOpen}
  class="bg-transparent"
  containerClass="rounded-sm bg-transparent dark:bg-transparent shadow-none dark:shadow-none"
>
  <DropdownItem
    id="dropdownAuto"
    class={`${itemClass} ${selectedTheme === 'system' ? 'hidden' : ''}`}
  >
    <Radio
      custom
      class={radioClass}
      bind:group={selectedTheme}
      on:change={handleThemeChange}
      value={'system'}
    >
      <span class="me-auto whitespace-nowrap">
        {$LL.colorTheme.auto()}
      </span>
      <slot name="system" />
    </Radio>
  </DropdownItem>

  <DropdownItem
    id="dropdownLight"
    class={`${itemClass} ${selectedTheme === 'light' ? 'hidden' : ''}`}
  >
    <Radio
      custom
      class={radioClass}
      bind:group={selectedTheme}
      on:change={handleThemeChange}
      value={'light'}
    >
      <span class="me-auto whitespace-nowrap">
        {$LL.colorTheme.light()}
      </span>
      <slot name="light" />
    </Radio>
  </DropdownItem>

  <DropdownItem
    id="dropdownDark"
    class={`${itemClass} ${selectedTheme === 'dark' ? 'hidden' : ''}`}
  >
    <Radio
      custom
      class={radioClass}
      bind:group={selectedTheme}
      on:change={handleThemeChange}
      value={'dark'}
    >
      <span class="me-auto whitespace-nowrap">
        {$LL.colorTheme.dark()}
      </span>
      <slot name="dark" />
    </Radio>
  </DropdownItem>
</Dropdown>
