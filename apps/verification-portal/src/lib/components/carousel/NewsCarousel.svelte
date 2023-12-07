<script lang="ts">
  import { Carousel } from 'flowbite-svelte';
  import Subheader from '$lib/typography/Subheader.svelte';
  import CardHeader from '$lib/typography/CardHeader.svelte';
  import { generateAssetURL } from '$lib/utils';
  import { dev } from '$app/environment';
  import type { NewsEntity } from '$lib/types';

  export let newsData: Array<NewsEntity>;
  let publishedNews: Array<NewsEntity>;

  let index = 0;
  if (dev) {
    publishedNews = [...newsData, ...newsData, ...newsData];
  } else {
    publishedNews = newsData.filter((item) => item.status === 'published');
  }

  let images = publishedNews.map((item, index) => ({
    index,
    date: item.date,
    src: generateAssetURL(item.image),
    title: item.title,
    content: item.content,
  }));

  function updateSlide(slide: number) {
    index = slide;
  }
  const cardHeaderClass = 'px-4 pt-6 sm:px-8 sm:pt-8 md:px-11 md:pt-11';
</script>

<div class="max-w-full space-y-4 backface-visibility-none">
  <Carousel
    {images}
    {index}
    autoplay={true}
    duration={5000}
    transition={null}
    class="rounded-b-none"
    on:change={({ detail }) => (index = detail.index)}
  >
    <div class={`${cardHeaderClass} mb-5 w-full`}>
      <Subheader>{images[index].date}</Subheader>
      <CardHeader title={images[index].title} />
      <p class="card-description h-24 line-clamp-4">
        {images[index].content}
      </p>
    </div>
  </Carousel>

  {#if images.length > 1}
    <div class="flex justify-start space-x-2 pb-11 px-4 sm:px-8 md:px-11">
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
