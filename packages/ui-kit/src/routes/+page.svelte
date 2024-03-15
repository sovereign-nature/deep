<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
</script>

<div class="flex min-h-screen flex-col items-center justify-start pt-16 dark:text-white">
	<Carousel.Root
		opts={{
			align: 'start'
		}}
		class="w-full max-w-sm"
	>
		<Carousel.Content>
			{#each [1, 2, 3, 4] as item}
				<Carousel.Item class="md:basis-1/2 lg:basis-1/3">
					<div class="p-1">
						<Card.Root>
							<Card.Content class="flex aspect-square items-center justify-center p-6">
								<span class="text-3xl font-semibold">{item}</span>
							</Card.Content>
						</Card.Root>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
