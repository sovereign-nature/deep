<script lang="ts">
	export let name: string;
</script>

<div class="flex flex-row p-2">
	<p class="text-white font-thin text-md">{name}::</p>
	<p class="text-white px-2 text-md"><slot /></p>
</div>
