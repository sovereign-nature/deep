<script lang="ts">
  export let content: string = '';
</script>

<h3 class="text-xl">
  {content}
  <slot />
</h3>
