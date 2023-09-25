<script lang="ts">
  export let name: string;
</script>

<div class="flex">
  <span class="dark:text-white text-sm font-thin">{name}:</span>
  <span class="dark:text-white px-2 text-sm"><slot /></span>
</div>
