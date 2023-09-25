<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  export let className: string = '';
  export let info: string = '';
</script>

<h2 class={`${className} text-sm font-sans mb-4 flex items-center`}>
  <slot />
  {#if info}
    <svg
      class="w-3 h-3 ms-2 opacity-80"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
    <Tooltip class="w-64 text-center p-4 z-50">{info}</Tooltip>
  {/if}
</h2>
