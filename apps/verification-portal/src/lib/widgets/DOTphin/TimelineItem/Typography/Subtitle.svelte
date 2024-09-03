<script lang="ts">
  export let content: string = '';
</script>

<p class="text-sm font-normal text-gray-200 block w-full">
  {content}
  <slot />
</p>
