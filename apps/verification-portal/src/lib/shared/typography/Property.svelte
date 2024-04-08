<script lang="ts">
  export let name: string;
</script>

<div class="flex items-center gap-2">
  <span class="text-sm font-thin dark:text-white">{name}:</span>
  <span class="text-sm dark:text-white"><slot /></span>
</div>
