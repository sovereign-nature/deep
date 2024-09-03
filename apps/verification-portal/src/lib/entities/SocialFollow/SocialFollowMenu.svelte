<script>
  import CONFIGS from '$lib/shared/siteConfigs';
  import LL from '$lib/shared/i18n/i18n-svelte';

  import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
  import LogoDiscord from '$lib/components/icons/LogoDiscord.svelte';
  import LogoTelegram from '$lib/components/icons/LogoTelegram.svelte';
  import MailingIcon from '$lib/components/icons/MailingIcon.svelte';

  export let iconsOnly = false;
  export let wrapperClass = 'text-gray-600 dark:text-gray-300';
  const links = {
    mailing: {
      url: CONFIGS.social.mailing,
      title: $LL.footer.mailing(),
    },
    discord: {
      url: CONFIGS.social.discord,
      title: $LL.socialFollow.discord(),
    },
    telegram: {
      url: CONFIGS.social.telegram,
      title: $LL.socialFollow.telegram(),
    },
  };

  let buttonSize = iconsOnly ? 'h-7 w-7' : 'h-6 w-6';
  let iconWrapperClass = ` ${buttonSize} transition flex justify-center items-center rounded-full bg-primary-300 text-white dark:text-black hover:bg-primary-200 transition`;
  let linkClasses = iconsOnly
    ? 'flex hover-arrow-link pt-1 items-center md:items-baseline dark:!text-primary-300 opacity-79 text-sm mb-4 md:mb-0 hover:opacity-100'
    : 'flex pt-1 items-center md:items-baseline dark:!text-primary-300 opacity-79 text-sm mb-4 md:mb-0 hover:opacity-100';
  let iconClasses = iconsOnly ? 'h-4 w-4' : 'h-3 w-3';
</script>

<div class={`text-start ${wrapperClass} `}>
  {#if iconsOnly}
    <span class=" font-aeonik text-xs">{$LL.socialFollow.title()}</span>
  {/if}

  <div class="flex flex-wrap gap-2 lg:gap-3">
    <a
      class={linkClasses}
      href={links.telegram.url}
      title={links.telegram.title}
      target="_blank"
    >
      <span class={iconWrapperClass}>
        <LogoTelegram className={iconClasses} />
      </span>
    </a>
    <a
      class={linkClasses}
      href={links.discord.url}
      title={links.discord.title}
      target="_blank"
    >
      <span class={iconWrapperClass}>
        <LogoDiscord className={iconClasses} />
      </span>
    </a>
    <a
      class={`hover-arrow-link ${linkClasses} `}
      href={links.mailing.url}
      title={links.mailing.title}
      target="_blank"
    >
      {#if !iconsOnly && links.mailing.url}
        <span
          class={`transition ease-in arrow-link mr-3  ${iconWrapperClass} !text-black`}
        >
          <ArrowRight className="h-3 w-3" />
        </span>
        {links.mailing.title}
      {:else}
        <span class={iconWrapperClass}>
          <MailingIcon className={iconClasses} />
        </span>
      {/if}
    </a>
  </div>
</div>

<style>
  .hover-arrow-link:hover .arrow-link {
    transform: translateX(0.25em);

    @apply bg-primary-200;
  }
</style>
