<script lang="ts">
  import LL from '$lib/shared/i18n/i18n-svelte';
  import { themeStore, setTheme } from '$lib/features/themeSwitch';
  import type { Theme } from '$lib/features/themeSwitch';

  let selectedTheme: string | undefined;

  $: selectedTheme = $themeStore;

  const handleThemeChange = () => {
    setTheme(selectedTheme as Theme);
  };

  const themes = [
    { value: 'light', name: $LL.colorTheme.lightSm() },
    { value: 'dark', name: $LL.colorTheme.darkSm() },
    { value: 'system', name: $LL.colorTheme.auto() },
  ];
</script>

<div class=" flex items-center justify-start gap-2 relative">
  <div
    class="bg-deep-green-600 text-primary-400 rounded-full h-8 w-8 flex items-center justify-center flex-none"
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
  </div>
  <select
    bind:value={selectedTheme}
    on:change={handleThemeChange}
    class="streched-link !bg-none bg-transparent border-none text-white font-serif max-w-[400px] streched-link text-base hover:text-primary-300"
  >
    {#each themes as { value, name }}
      {#if value === selectedTheme}
        <option class="text-primary-300 font-aeonik" selected {value}>
          {$LL.colorTheme.switchTheme({ name: name })}
        </option>
      {:else}
        <option class="text-black font-aeonik" {value}>{name}</option>
      {/if}
    {/each}
  </select>
</div>
