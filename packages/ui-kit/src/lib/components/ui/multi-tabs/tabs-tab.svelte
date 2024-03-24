<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';
	import { getMultiTabsContext, type MultiTabsTab } from './context.js';

	import { cn } from '$lib/utils.js';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = HTMLAttributes<HTMLDivElement> & {
		index: number;
		tabItem: MultiTabsTab;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let index: number;
	export let tabItem: MultiTabsTab;

	const { activeTab, addTab } = getMultiTabsContext();
	addTab(tabItem, index);

	$: active = $activeTab == index;
</script>

{#if active}
	<div class={cn('relative', 'visible', className)} transition:fade={{ duration: 200 }}>
		<slot />
	</div>
{/if}
