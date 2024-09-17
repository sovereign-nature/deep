<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let title: string;
  export let disabled: boolean = false;
  const dispatch = createEventDispatcher();

  const baseClass = `px-4 py-2 rounded-full whitespace-nowrap drop-shadow-sm font-aeonik text-base`;
  const activeClass = `text-white bg-primary-400 hover:bg-primary-300`;
  const disabledClass = `text-deep-green bg-gray-300 cursor-not-allowed opacity-80`;
</script>

<button
  type="button"
  data-umami-event="dotphin-timeline-action-button-click"
  class={`${baseClass} ${disabled ? disabledClass : activeClass}`}
  on:click={() => dispatch('click')}
  {disabled}>{title}</button
>
