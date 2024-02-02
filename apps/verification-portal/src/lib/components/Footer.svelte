<script lang="ts">
  /* eslint-disable */
  // TODO: fix linting issue
  const currentYear = new Date().getFullYear();
  const copyrightNotice = `© ${currentYear} SNI`;
  import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
  import LL from '$lib/shared/i18n/i18n-svelte';

  const links = {
    mailing: {
      url: 'https://sovereignnature.com/#subscribe',
      title: $LL.footer.mailing(),
    },
    terms: {
      url: 'https://sovereignnature.com/terms-conditions',
      title: $LL.footer.terms(),
    },
    privacy: {
      url: 'https://sovereignnature.com/privacy-policy',
      title: $LL.footer.privacy(),
    },
    copyright: {
      url: 'https://sovereignnature.com/',
      title: copyrightNotice,
    },
  };
</script>

<div class="w-full mt-8 mb-4">
  <div
    class="container mx-auto md:text-center text-gray-600 h-28 py-8 px-4 xl:px-0"
  >
    <div class="grid md:grid-cols-12 gap-3 h-full">
      <div class=" md:col-span-6">
        <a
          class=" flex hover-arrow-link pt-1 items-center md:items-baseline dark:!text-primary-300 opacity-70 text-xs dark:text-gray-500 opacity-90 hover:opacity-100"
          href={links.mailing.url}
          target="_blank"
        >
          <span
            class="transition ease-in arrow-link mr-3 flex justify-center items-center rounded-full h-6 w-6 bg-primary-300 text-black"
          >
            <ArrowRight className="h-3 w-3" />
          </span>{links.mailing.title}</a
        >
      </div>

      {#each Object.entries(links) as [_key, value], index}
        {#if index > 0}
          <div
            class="{'class' in value
              ? value?.class
              : ''} md:col-span-2 md:text-end"
          >
            <a
              class="{'linkClass' in value
                ? value?.linkClass
                : ''} text-xs font-light dark:text-gray-50 hover:opacity-80"
              href={value.url}
              target="_blank">{value.title}</a
            >
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
  .hover-arrow-link:hover .arrow-link {
    transform: translateX(0.25em);

    @apply bg-primary-200;
  }
</style>
