<script lang="ts">
  /* eslint-disable */
  // TODO: fix linting issue

  import CONFIGS from '$lib/shared/siteConfigs';
  import SocialFollowMenu from '$lib/entities/SocialFollow/SocialFollowMenu.svelte';

  import LL from '$lib/shared/i18n/i18n-svelte';

  const currentYear = new Date().getFullYear();
  const copyrightNotice = `© ${currentYear} SNI`;
  const links = {
    mailing: {
      url: CONFIGS.social.mailing,
      title: $LL.footer.mailing(),
    },
    terms: {
      url: CONFIGS.footer.terms,
      title: $LL.footer.terms(),
    },
    privacy: {
      url: CONFIGS.footer.privacy,
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
    class="container mx-auto md:text-center text-gray-600 md:h-28 py-8 sm:px-4 px-12 xl:px-0"
  >
    <div class="grid md:grid-cols-10 gap-3 h-full">
      <div class=" md:col-span-4">
        <SocialFollowMenu />
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
                : ''} text-sm font-light dark:text-gray-50 hover:opacity-80"
              href={value.url}
              target="_blank">{value.title}</a
            >
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>
