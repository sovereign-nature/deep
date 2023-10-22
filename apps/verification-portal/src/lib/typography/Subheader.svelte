<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
  export let className: string = '';
  export let info: string = '';
  export let url: string = '';
</script>

<h2 class={`${className} text-sm font-sans font-light mb-4 flex items-center`}>
  <slot />

  {#if url}
    <a
      class="opacity-80 hover:opacity-100"
      href={url}
      target="_blank"
      title={info}
    >
      <InfoIcon className="w-3 h-3 ms-2 " />
    </a>
  {:else if info}
    <InfoIcon className="w-3 h-3 ms-2 opacity-80 hover:opacity-100" />
    <Tooltip class="w-64 text-center p-4 z-50">{info}</Tooltip>
  {/if}
</h2>
