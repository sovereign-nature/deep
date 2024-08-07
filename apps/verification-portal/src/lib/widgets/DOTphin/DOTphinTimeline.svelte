<script lang="ts">
  import { Timeline } from 'flowbite-svelte';
  import TimelineItem from './TimelineItem/TimelineItem.svelte';
  import FeaturedCard from '$lib/entities/featured/FeaturedCardSM.svelte';
  const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ea commodi nihil iusto iure odio nisi sit accusantium cumque accusamus magnam.`;
  const text2 = `Consequuntur in ipsa maxime quibusdam doloremque necessitatibus eaque possimus!`;
  const item = {
    id: '12',
    tokenId: '12',
    name: 'DOTphin Egg',
    description: 'lorem',
    image:
      'https://real.myfilebase.com/ipfs/QmagUnan8yPS7fFRL6hxk2VkdXbroD4AJGfLPDFzAgFEis/polkadot-decoded-2024-water.png',
    collection: {
      id: '665',
      name: '',
    },
    address: 'did:asset:eip155:8880.unique2:665:12',
  };
  export let state: 'initial' | 'unlock' | 'evolve' | 'noProof' = 'evolve';
  export let order: 'horizontal' | 'vertical' = 'horizontal';
</script>

<div
  class="bg-deep-green dark:bg-black dark:bg-opacity-60 text-white rounded-b-lg ps-6 pt-8 sm:p-16 overflow-x-auto mb-8"
>
  {#if state === 'initial'}
    <Timeline {order}>
      <TimelineItem itemState="active" stepTitle="Attendance Proofs" proofIcon>
        <svelte:fragment slot="header">
          <h3 class="text-xl">You don't own any DOTphin proofs</h3>
        </svelte:fragment>
        <svelte:fragment slot="content">
          <p class="my-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            {text}
          </p>
          <a href="/#collections" class="text-xs text-primary"
            >Upcoming Events</a
          >
        </svelte:fragment>
      </TimelineItem>

      <TimelineItem itemState="locked" stepTitle="Multipass NFT" eggIcon>
        <svelte:fragment slot="header">
          <button
            type="button"
            disabled
            class="px-4 py-2 rounded-full whitespace-nowrap disabled:cursor-not-allowed drop-shadow-sm text-deep-green bg-gray-300 font-aeonik text-base"
            >Unlock the Egg</button
          >
        </svelte:fragment>
        <svelte:fragment slot="content">
          <p class="my-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            {text2}
          </p>
        </svelte:fragment>
      </TimelineItem>
      <TimelineItem itemState="locked" stepTitle="Evolve the NFT" multiIcon>
        <svelte:fragment slot="header">
          <button
            type="button"
            disabled
            class="px-4 py-2 rounded-full whitespace-nowrap disabled:cursor-not-allowed drop-shadow-sm text-deep-green bg-gray-300 font-aeonik text-base"
            >Evolve the Egg</button
          >
        </svelte:fragment>
        <svelte:fragment slot="content">
          <p class="my-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            {text}
          </p>
          <a
            href="https://sovereignnature.com/dotphin"
            class="text-xs text-primary">Read more</a
          >
        </svelte:fragment>
      </TimelineItem>
    </Timeline>
  {:else if state === 'unlock'}
    <Timeline {order}>
      <TimelineItem
        itemState="complete"
        stepTitle="Attendance Proofs"
        proofIcon
      >
        <svelte:fragment slot="header">
          <h3 class="text-xl">
            You own <span class="text-primary-300 text-2xl">3</span> DOTphin proofs
          </h3>
        </svelte:fragment>
        <svelte:fragment slot="content">
          <p
            class="mt-4 mb-2 text-sm font-normal text-gray-500 dark:text-gray-400"
          >
            {text}
          </p>
          <a href="/#collections" class="text-xs text-primary"
            >See all your proofs</a
          >
        </svelte:fragment>
      </TimelineItem>

      <TimelineItem itemState="active" stepTitle="Multipass NFT" eggIcon>
        <svelte:fragment slot="header">
          <button
            type="button"
            class="px-4 py-2 rounded-full whitespace-nowrap disabled:opacity-80 disabled:cursor-not-allowed drop-shadow-sm text-white bg-primary-400 hover:bg-primary-300 font-aeonik text-base"
            >Unlock the Egg</button
          >
        </svelte:fragment>
        <svelte:fragment slot="content">
          <p class="my-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            {text2}
          </p>
        </svelte:fragment>
      </TimelineItem>
      <TimelineItem itemState="locked" stepTitle="Evolve the NFT" multiIcon>
        <svelte:fragment slot="header">
          <button
            type="button"
            disabled
            class="px-4 py-2 rounded-full whitespace-nowrap disabled:cursor-not-allowed drop-shadow-sm text-deep-green bg-gray-300 font-aeonik text-base"
            >Evolve the Egg</button
          >
        </svelte:fragment>
        <svelte:fragment slot="content">
          <p class="my-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            {text}
          </p>
          <a
            href="https://sovereignnature.com/dotphin"
            class="text-xs text-primary">Read more</a
          >
        </svelte:fragment>
      </TimelineItem>
    </Timeline>
  {:else if state === 'evolve'}
    <Timeline {order}>
      <TimelineItem itemState="complete" stepTitle="Multipass NFT">
        <svelte:fragment slot="featured">
          <FeaturedCard {item} />
        </svelte:fragment>
      </TimelineItem>
      <TimelineItem
        itemState="complete"
        stepTitle="Attendance Proofs"
        proofIcon
      >
        <svelte:fragment slot="header">
          <h3 class="text-xl">
            You have used <span class="text-primary-300 text-2xl">1/3</span> DOTphin
            proofs
          </h3>
        </svelte:fragment>
        <svelte:fragment slot="content">
          <p
            class="mt-4 mb-2 text-sm font-normal text-gray-500 dark:text-gray-400"
          >
            {text}
          </p>
          <a href="/#collections" class="text-xs text-primary"
            >See all your proofs</a
          >
        </svelte:fragment>
      </TimelineItem>
      <TimelineItem itemState="active" stepTitle="Evolve the NFT" multiIcon>
        <svelte:fragment slot="header">
          <button
            type="button"
            class="px-4 py-2 rounded-full whitespace-nowrap disabled:opacity-80 disabled:cursor-not-allowed drop-shadow-sm text-white bg-primary-400 hover:bg-primary-300 font-aeonik text-base"
            >Evolve the Egg</button
          >
        </svelte:fragment>
        <svelte:fragment slot="content">
          <p class="my-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            {text}
          </p>
          <a
            href="https://sovereignnature.com/dotphin"
            class="text-xs text-primary">Read more</a
          >
        </svelte:fragment>
      </TimelineItem>
    </Timeline>
  {:else if state === 'noProof'}
    <Timeline {order}>
      <TimelineItem itemState="complete" stepTitle="Multipass NFT">
        <svelte:fragment slot="featured">
          <FeaturedCard {item} />
        </svelte:fragment>
      </TimelineItem>
      <TimelineItem
        itemState="complete"
        stepTitle="Attendance Proofs"
        proofIcon
      >
        <svelte:fragment slot="header">
          <h3 class="text-xl">
            You have used <span class="text-primary-300 text-2xl">3/3</span>
            DOTphin proofs
          </h3>
        </svelte:fragment>
        <svelte:fragment slot="content">
          <p
            class="mt-4 mb-2 text-sm font-normal text-gray-500 dark:text-gray-400"
          >
            {text}
          </p>
          <a href="/#collections" class="text-xs text-primary"
            >See all your proofs</a
          >
        </svelte:fragment>
      </TimelineItem>
      <TimelineItem itemState="locked" stepTitle="Evolve the NFT" multiIcon>
        <svelte:fragment slot="header">
          <button
            type="button"
            disabled
            class="px-4 py-2 rounded-full whitespace-nowrap disabled:cursor-not-allowed drop-shadow-sm text-deep-green bg-gray-300 font-aeonik text-base"
            >Evolve the Egg</button
          >
        </svelte:fragment>
        <svelte:fragment slot="content">
          <p class="my-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            Get more unused proofs to evolve your NFT
          </p>
          <a href="/#collections" class="text-xs text-primary"
            >Upcoming Events</a
          >
        </svelte:fragment>
      </TimelineItem>
    </Timeline>
  {/if}
</div>
