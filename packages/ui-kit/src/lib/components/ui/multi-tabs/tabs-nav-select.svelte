<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getMultiTabsContext } from './context.js';
	import * as Select from '$lib/components/ui/select/index.js';
    import ItemCard from '$lib/components/ui/multi-tabs/tabs-nav-card-sm.svelte';
	import type {  Selected } from 'bits-ui';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = HTMLAttributes<HTMLDivElement>;

	const { activeTab, startIndex, tabs, titleFull } = getMultiTabsContext();
    function setTabFromSelect( e : Selected<unknown>| undefined) {
        const selected: number = e && typeof e.value === 'number' ? e.value : $startIndex;

    $activeTab = selected;
}
		
</script>

<div class="flex flex-col  w-full max-w-xl">
<Select.Root preventScroll="{false}" onSelectedChange={(e) => setTabFromSelect(e)}  selected={{value:$activeTab, label: $tabs[$activeTab].label}}>
    <Select.Label class="text-center font-normal	"> <span class="dark:text-gray-400 text-sm  "> {$titleFull}</span> </Select.Label>
		<Select.Trigger>
        <ItemCard item={$tabs[$activeTab]} active/>
		</Select.Trigger>
		<Select.Content>
			<Select.Group class="flex flex-col">
				{#each $tabs as item, index}
					<Select.Item
						value={index}
						label={item.label}
					>
                    <ItemCard item={item} active={$activeTab === index}/>
					</Select.Item
					>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</div>
