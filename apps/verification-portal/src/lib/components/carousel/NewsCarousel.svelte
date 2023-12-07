<script lang="ts">
  import { Carousel } from 'flowbite-svelte';
  import Subheader from '$lib/typography/Subheader.svelte';
  import CardHeader from '$lib/typography/CardHeader.svelte';
  import { generateAssetURL } from '$lib/utils';
  import { dev } from '$app/environment';
  import type { NewsEntity } from '$lib/types';
  import { format, parseISO } from 'date-fns';

  export let newsData: Array<NewsEntity>;
  let publishedNews: Array<NewsEntity>;
  let autoplay = true;

  let index = 0;
  if (dev) {
    publishedNews = newsData;
  } else {
    publishedNews = newsData.filter((item) => item.status === 'published');
  }

  let images = publishedNews.map((item, index) => ({
    index,
    date: format(parseISO(item.date_created), 'd MMM yyyy'),
    src: generateAssetURL(item.image),
    title: item.title,
    content: item.content,
  }));

  function updateSlide(slide: number) {
    index = slide;
  }
  const cardHeaderClass = 'px-4 pt-6 sm:px-8 sm:pt-8 md:px-11 md:pt-11';
  let expanded = false;

  function toggleExpanded() {
    expanded = !expanded;
  }
</script>

<div
  class="max-w-full space-y-4 backface-visibility-none pb-11"
  on:mouseenter={() => (autoplay = false)}
  on:mouseleave={() => (autoplay = true)}
  role="tablist"
  aria-label="News carousel"
  tabindex="0"
>
  <Carousel
    {images}
    {index}
    duration={autoplay && !expanded ? 5000 : undefined}
    transition={null}
    on:change={({ detail }) => (index = detail.index)}
    class="rounded-b-none"
  >
    <div class={`${cardHeaderClass} mb-5 w-full`}>
      <Subheader>{images[index].date}</Subheader>
      <CardHeader title={images[index].title} />
      <p class={`card-description ${expanded ? 'expanded' : 'collapsed'}`}>
        {images[index].content.length > 300
          ? expanded
            ? images[index].content
            : `${images[index].content.substring(0, 300)}...`
          : images[index].content}
      </p>
      <div class="flex flex-row justify-end">
        {#if images[index].content.length > 300}
          <button
            class="text-primary-400 text-sm me-6 mt-3"
            on:click={toggleExpanded}
          >
            {expanded ? 'Close' : 'Read More'}
          </button>
        {/if}
      </div>
    </div>
  </Carousel>

  {#if images.length > 1}
    <div class="flex justify-start space-x-2 px-4 sm:px-8 md:px-11">
      {#each images as image, i}
        <button
          class="w-3 h-3 rounded-full border block border-white {i === index
            ? 'bg-primary-400'
            : 'bg-gray-300'}"
          on:click={() => updateSlide(i)}
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .card-description {
    transition: height 0.5s ease-in-out;
    overflow: hidden;
  }

  .expanded {
    height: auto;
  }

  .collapsed {
    @apply line-clamp-4;
    height: 6rem; /* Approx. 3 lines of text */
  }
</style>
