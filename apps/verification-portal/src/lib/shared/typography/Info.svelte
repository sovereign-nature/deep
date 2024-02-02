<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
  export let className = '';
</script>

<InfoIcon className={`${className} w-3 h-3 opacity-80 hover:opacity-100`} />
<Tooltip class="w-64 text-center p-4 z-50 break-all"><slot /></Tooltip>
