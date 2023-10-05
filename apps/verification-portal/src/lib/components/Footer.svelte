<script lang="ts">
  /* eslint-disable */
  // TODO: fix linting issue
  const currentYear = new Date().getFullYear();
  const copyrightNotice = `© ${currentYear} SNI`;
  const links = {
    terms: {
      url: 'https://sovereignnature.com/terms-conditions',
      title: 'Terms & Conditions',
    },
    privacy: {
      url: 'https://sovereignnature.com/privacy-policy',
      title: 'Privacy Policy',
    },
    mailing: {
      class: 'md:col-span-4 md:text-center',
      linkClass: 'dark:!text-gray-200 opacity-70 font-bold ',
      url: 'https://sovereignnature.com/#subscribe',
      title: 'Subscribe to our mailing list',
    },
    copyright: {
      class: 'md:col-span-4 md:text-end',
      url: 'https://sovereignnature.com/',
      title: copyrightNotice,
    },
  };
</script>

<div class="w-full mt-8 mb-8">
  <div
    class="container mx-auto md:text-center text-gray-600 h-36 py-8 px-4 xl:px-0"
  >
    <div class="grid md:grid-cols-12 gap-3 h-full">
      {#each Object.entries(links) as [_key, value]}
        <div class="{'class' in value ? value?.class : ''} md:col-span-2">
          <a
            class="{'linkClass' in value
              ? value?.linkClass
              : ''} text-[10px] uppercase dark:text-gray-500 opacity-50 hover:opacity-80"
            href={value.url}
            target="_blank">{value.title}</a
          >
        </div>
      {/each}
    </div>
  </div>
</div>
