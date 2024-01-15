<!-- Toggle.svelte -->
<script lang="ts">
  import { Toggle } from 'flowbite-svelte';
  export let checked: boolean = false;
  export let color: string = 'green';
  export let disabled: boolean = false;
  export let toggleFunction: () => Promise<void>;

  async function toggle() {
    await toggleFunction();
  }
</script>

<Toggle {color} {checked} class="toggle-button" {disabled} on:click={toggle}>
  <div class="flex flex-col items-start justify-end mt-2">
    <slot />
  </div>
</Toggle>
