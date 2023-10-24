<script lang="ts">
  import { Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
  import { browser } from '$app/environment';

  export let btnClass: string =
    'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700  text-sm cursor-pointer ';

  export let itemClass =
    'p-0 flex justify-start items-baseline gap-2 dark:hover:bg-transparent cursor-pointer';
  export let ariaLabel: string = 'Dark mode';

  let selectedTheme: string =
    browser && localStorage.getItem('color-theme')
      ? localStorage.getItem('color-theme')
      : 'system';

  let dropdownOpen = false;

  const handleThemeChange = () => {
    if (selectedTheme === 'system') {
      localStorage?.removeItem('color-theme');
      window.document.documentElement.classList.toggle(
        'dark',
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    } else {
      localStorage?.setItem('color-theme', selectedTheme);
      toggleTheme(selectedTheme);
    }
    dropdownOpen = false;
  };

  const toggleTheme = (theme: string) => {
    const isDark = theme === 'dark';
    window.document.documentElement.classList.toggle('dark', isDark);
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
      <span class="ms-1 text-xs"> Auto </span>
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
      <span class="ms-1 text-xs"> Light</span>
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
      <span class="ms-1 text-xs"> Dark</span>
    </Radio>
  </DropdownItem>
</Dropdown>
