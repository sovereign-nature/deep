<script lang="ts">
  export let name: string;
</script>

<div class="flex items-center gap-2">
  <span class="dark:text-white text-sm font-thin">{name}:</span>
  <span class="dark:text-white text-sm"><slot /></span>
</div>
