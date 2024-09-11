<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let disabled = false;
  export let value;
  export let subtitle: string | undefined;
</script>

<button
  type="button"
  {disabled}
  class="flex flex-col min-h-24 aspect-square justify-center bg-deep-blue-700 disabled:opacity-35 disabled:bg-deep-blue-800 disabled:pointer-events-none items-center border-2 border-transparent hover:border-primary-200 rounded-lg p-4 cursor-pointer transition-all"
  on:click={() => dispatch('select', { value })}
  on:keydown={(event) =>
    (event.key === 'Enter' || event.key === ' ') &&
    dispatch('select', { value })}
>
  <div class="text-4xl mb-2">
    <slot name="icon"></slot>
  </div>
  {#if subtitle}
    <div class="text-sm font-semibold">
      {subtitle}
    </div>
  {/if}
</button>
