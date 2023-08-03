<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	onMount(async () => {
		if (browser) {
			const modelViewer = await import('@google/model-viewer');
		}
	});
</script>

<model-viewer
	alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
	src="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"
	environment-image="https://modelviewer.dev/shared-assets/environments/moon_1k.hdr"
	poster="https://modelviewer.dev/shared-assets/models/NeilArmstrong.webp"
	ar
	shadow-intensity="1"
	camera-controls
	touch-action="pan-y"
	class="w-full h-full"
/>
