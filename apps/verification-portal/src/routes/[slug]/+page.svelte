<script setup lang="ts">
	import Info from '$lib/containers/Info.svelte';
	import Header from '$lib/typography/Header.svelte';
	import Property from '$lib/typography/Property.svelte';
	import Subheader from '$lib/typography/Subheader.svelte';

	export let data;
</script>

<div class="lg:flex lg:flex-row lg:p-5">
	<!-- <div> -->
	<Info>
		<Header>Verified Asset:</Header>
		<Subheader>{data.slug}</Subheader>
		<img class="p-2" src="https://placehold.co/600x400" alt="Item visualization" />
		<h2 class="text-xl text-white p-2">Metadata:</h2>
		<Property name="Game">
			<p>Hotel Hideaway</p>
		</Property>
		<Property name="ID">
			<p>0x7688x8s8</p>
		</Property>
		<Property name="Link Address">
			<p>0x068647392974</p>
		</Property>
		<Property name="Copies Sold">
			<p>2</p>
		</Property>
	</Info>
	<Info>
		<Header>Collecting Funds For:</Header>
		<Subheader>North Of Upemba</Subheader>
		<img class="p-2" src="https://placehold.co/600x400" alt="Item visualization" />
		<h2 class="text-xl text-white p-2">Funds Collected:</h2>
		<Property name="ID">
			<p>x150</p>
		</Property>
		<Property name="Zebras Spotted">
			<p>10</p>
		</Property>
		<Property name="Elephants Spotted">
			<p>100</p>
		</Property>
		<Property name="Rangers Patrolling">
			<p>1000</p>
		</Property>
	</Info>
	<Info>
		<Header>Campaign Info:</Header>
		<Subheader>Upemba National Park</Subheader>
		<img class="p-2" src="https://placehold.co/600x400" alt="Item visualization" />
		<h2 class="text-xl text-white p-2">Funds Collected:</h2>
		<Property name="By this item">
			<p>10 $</p>
		</Property>
		<Property name="By all copies of this item">
			<p>10000 $</p>
		</Property>
		<Property name="Total By Campaign">
			<p>1000 000 $</p>
		</Property>
	</Info>
</div>
