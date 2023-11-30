<script lang="ts">
  import DarkMode from '$lib/components/navbar/DarkMode.svelte';
  import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
  import SunIcon from '$lib/components/icons/SunIcon.svelte';
  import SystemIcon from '$lib/components/icons/SystemIcon.svelte';
</script>

<DarkMode>
  <svelte:fragment slot="system">
    <SystemIcon className="w-4 h-4 mx-1" />
  </svelte:fragment>
  <svelte:fragment slot="light">
    <SunIcon className="w-4 h-4 mx-1" />
  </svelte:fragment>
  <svelte:fragment slot="dark">
    <MoonIcon className="w-4 h-4 mx-1" />
  </svelte:fragment>
</DarkMode>
