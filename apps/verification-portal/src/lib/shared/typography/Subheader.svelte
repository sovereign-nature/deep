<script lang="ts">
  import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
  import Info from '$lib/shared/typography/Info.svelte';
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
    <Info className="ms-2">
      {info}
    </Info>
  {/if}
</h2>
