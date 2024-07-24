<script lang="ts">
  import Spinner from '$lib/components/icons/Spinner.svelte';
  import { createEventDispatcher } from 'svelte';

  export let className: string = '';
  export let spinnerClass: string =
    'h-5 w-5 fill-primary-500 text-primary-300 me-3';
  export let isPending: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<button
  on:click={() => dispatch('click')}
  class={className}
  disabled={isPending}
  type="button"
>
  {#if isPending}
    <Spinner className={spinnerClass} />
  {/if}
  <!-- Title slot -->
  <slot></slot>
</button>
