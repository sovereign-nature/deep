<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getMultiTabsContext } from './context.js';
	import { cn } from '$lib/utils.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = HTMLAttributes<HTMLDivElement> & {
		carousel?: boolean;
		select?: boolean;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let carousel = true;
	export let select = false;

	const { activeTab, startIndex, tabs } = getMultiTabsContext();
</script>

{#if select}
	<select bind:value={$activeTab} class="rounded border border-gray-300 p-2">
		{#each $tabs as item, index}
			<option value={index}> {item.label}</option>
		{/each}
	</select>
{/if}
<div class="min-h-16">
	{#if carousel}
		<Carousel.Root
			opts={{
				align: 'start',
				loop: true,
				duration: 80,
				startIndex: $startIndex,
				inViewThreshold: 0.25
			}}
			class={cn('max-w-full', className)}
			bind:activeItemIndex={$activeTab}
		>
			<Carousel.Content>
				{#each $tabs as item, index}
					<Carousel.Item {index} class="flex min-w-[260px] flex-row">
						<div class=" w-full">
							<Card.Root
								class={`${$activeTab === index ? '  border-none transition dark:bg-opacity-60' : 'bg-deep-green hover:dark:text-primary-300 hover:text-primary-300 border-none bg-opacity-5 hover:bg-opacity-10 dark:bg-black dark:bg-opacity-20'} bg-deep-green mb-2 mt-0 rounded px-3 py-2 font-serif text-sm text-gray-400 transition sm:px-6 sm:py-4 sm:text-base lg:text-xl xl:text-2xl dark:bg-black dark:text-gray-400`}
							>
								<Card.Content
									class={`${$activeTab === index ? 'text-primary-300 dark:text-primary-200' : ''} flex flex-row items-center gap-4  p-0`}
								>
									{#if item.img}
										<img
											src={item.img}
											alt={item.label}
											class="aspect-square h-11 w-11 rounded-full object-cover"
										/>
									{:else}
										<div
											class="bg-deep-green-700 aspect-square h-11 w-11 rounded-full object-cover"
										></div>
									{/if}
									<span> {item.label} </span>
								</Card.Content>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Next class="bg-primary-300 right-1 border-none opacity-90 hover:opacity-100" />
		</Carousel.Root>
	{/if}
</div>
