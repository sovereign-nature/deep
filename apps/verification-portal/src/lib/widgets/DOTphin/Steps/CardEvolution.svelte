<script lang="ts">
  import {
    multipassData,
    evolveStepState,
    multipassStepConfig,
    isLoading,
  } from '$lib/features/MultipassStates';
  import siteConfigs from '$lib/shared/siteConfigs';
  import { MAX_EVOLUTION_LEVEL } from '$lib/shared/multipassConfig';
  import TimelineItem from '$lib/widgets/DOTphin/TimelineItem/TimelineItem.svelte';
  import TimelineActionButton from '$lib/widgets/DOTphin/TimelineItem/TimelineActionButton.svelte';
  import CardSubtitle from '$lib/widgets/DOTphin/TimelineItem/Typography/Subtitle.svelte';
  import CardTitle from '$lib/widgets/DOTphin/TimelineItem/Typography/Title.svelte';

  import { LL } from '$lib/shared/i18n/i18n-svelte';
  const cardLink =
    siteConfigs?.contentLinks?.DOTphin?.evolution ||
    siteConfigs?.contentLinks?.DOTphin?.default ||
    '';
</script>

<TimelineItem
  itemState={$multipassStepConfig.evolution.stepStatus}
  stepTitle={$LL.multipass.state.evolveStep.stepTitle()}
  multiIcon
  isLoading={$isLoading}
>
  <svelte:fragment slot="header">
    {#if $evolveStepState === 'COMPLETE'}
      <CardTitle content={$LL.multipass.state.evolveStep.COMPLETE.title()} />
    {:else}
      <TimelineActionButton
        disabled={$multipassStepConfig.evolution.stepStatus !== 'active'}
        title={$LL.multipass.state.evolveStep.INITIAL.cta()}
      />
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="content">
    {#if $evolveStepState === 'INITIAL'}
      <CardSubtitle content={$LL.multipass.state.evolveStep.INITIAL.subtitle()}
      ></CardSubtitle>
    {:else}
      <CardSubtitle>
        {$LL.multipass.state.evolveStep.EVOLVING.subtitle({
          level: $multipassData.evolution.level,
          maxLevel: MAX_EVOLUTION_LEVEL,
        })}
      </CardSubtitle>
    {/if}
    {#if cardLink}
      <a
        href={cardLink}
        class="text-xs text-primary-300 hover:text-primary-200 transition-colors"
        target="_blank">{$LL.multipass.state.evolveStep.INITIAL.moreInfo()}</a
      >
    {/if}
  </svelte:fragment>
</TimelineItem>
