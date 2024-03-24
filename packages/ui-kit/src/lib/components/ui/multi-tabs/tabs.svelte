<script lang="ts">
	import { writable } from 'svelte/store';

	import { createEventDispatcher } from 'svelte';
	import { setMultiTabsContext, type MultiTabsTab } from './context.js';
	import * as MultiTabs from '$lib/components/ui/multi-tabs/index.js';

	const dispatch = createEventDispatcher();

	export let setStartIndex: number = 0;
	export let setActiveIndex: number = setStartIndex;
	export let tabsTitle: string = '';

	const startIndex = writable(setStartIndex);
	const activeTab = writable(setStartIndex);
	const tabs = writable<MultiTabsTab[]>([]);
	const title = writable(tabsTitle);

	$: updateIndex(setActiveIndex);

	$: updateActive($activeTab);

	function addTab(tab: MultiTabsTab, index: number) {
		tabs.update((currentTabs: MultiTabsTab[]) => {
			const newTabs: MultiTabsTab[] = [...currentTabs];
			newTabs.splice(index, 0, tab);
			return newTabs;
		});
	}
	function updateActive(index: number) {
		dispatch('change', index);
	}
	function updateIndex(index: number) {
		activeTab.set(index);
	}
	setMultiTabsContext({
		startIndex,
		activeTab,
		tabs,
		title,
		addTab
	});
</script>

<div class="max-w-full flex-col items-start justify-start">
	<MultiTabs.Nav ></MultiTabs.Nav>
	<div
		class="bg-deep-green mt-3 min-h-[500px] w-full rounded-lg bg-opacity-100 p-6 pt-3 md:p-12 dark:bg-black dark:bg-opacity-60"
	>
		<slot name="tabs-items" />
	</div>
</div>
