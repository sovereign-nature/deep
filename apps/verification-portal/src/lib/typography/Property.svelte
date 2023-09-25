<script lang="ts">
  export let name: string;
</script>

<div class="flex flex-row">
  <p class="dark:text-white text-sm font-light">{name}:</p>
  <p class="dark:text-white px-2 text-sm"><slot /></p>
</div>
