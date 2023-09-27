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
  };
</script>

<div class="w-full mt-8 mb-8">
  <div
    class="container mx-auto text-center text-gray-600 h-36 py-8 px-4 xl:px-0"
  >
    <div class="flex gap-3 h-full items-end">
      {#each Object.entries(links) as [_key, value]}
        <a
          class="text-[10px] uppercase dark:text-gray-500 opacity-50 hover:opacity-80"
          href={value.url}
          target="_blank">{value.title}</a
        >
      {/each}
      <span class="text-[10px] uppercase dark:text-gray-500 opacity-50 ms-auto"
        >{copyrightNotice}</span
      >
    </div>
  </div>
</div>
