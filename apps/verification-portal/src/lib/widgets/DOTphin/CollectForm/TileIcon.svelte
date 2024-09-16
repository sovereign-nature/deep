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
  on:click={() => dispatch('select', { value })}
  on:keydown={(event) =>
    (event.key === 'Enter' || event.key === ' ') &&
    dispatch('select', { value })}
  class="w-full flex md:flex-col gap-3 items-center justify-center tile-btn disabled:opacity-35 disabled:pointer-events-none disabled:cursor-not-allowed"
>
  <span
    class=" tile-icon flex gap-x-6 gap-y-2 p-4 w-full md:flex-col md:justify-center md:aspect-square text-white bg-deep-blue-700 items-center border-3 border-transparent rounded-lg transition-all"
  >
    <div class="text-4xl h-16 w-16">
      <slot name="icon"></slot>
    </div>
    {#if subtitle}
      <div class=" font-semibold tile-subtitle md:hidden">
        {subtitle}
      </div>
    {/if}
  </span>
  {#if subtitle}
    <div class="text-sm font-semibold tile-subtitle hidden md:block">
      {subtitle}
    </div>
  {/if}
</button>

<style>
  .tile-btn:hover .tile-icon {
    @apply border-primary-200;
  }
  .tile-btn:hover .tile-subtitle {
    @apply text-primary-300;
  }
</style>
