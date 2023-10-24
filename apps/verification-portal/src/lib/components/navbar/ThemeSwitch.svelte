<script lang="ts">
  import DarkMode from '$lib/components/navbar/DarkMode.svelte';
  import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
  import SunIcon from '$lib/components/icons/SunIcon.svelte';
  import SystemIcon from '$lib/components/icons/SystemIcon.svelte';
  export let className: string = '';
</script>

<DarkMode
  class={className}
  btnClass="text-gray-300 dark:text-primary-500 text-sm pe-4 opacity-50 hover:opacity-100 active:opacity-100"
>
  <svelte:fragment slot="system">
    <SystemIcon className="w-4 h-4" />
  </svelte:fragment>
  <svelte:fragment slot="light">
    <SunIcon className="w-4 h-4" />
  </svelte:fragment>
  <svelte:fragment slot="dark">
    <MoonIcon className="w-4 h-4" />
  </svelte:fragment>
</DarkMode>
