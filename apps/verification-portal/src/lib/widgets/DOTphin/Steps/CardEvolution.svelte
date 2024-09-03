<script lang="ts">
  import {
    state,
    evolveStepState,
    MAX_EVOLUTION_LEVEL,
  } from '$lib/widgets/DOTphin/MultipassStates';
  import TimelineItem from '$lib/widgets/DOTphin/TimelineItem/TimelineItem.svelte';
  import TimelineActionButton from '$lib/widgets/DOTphin/TimelineItem/TimelineActionButton.svelte';
  import CardSubtitle from '$lib/widgets/DOTphin/TimelineItem/Typography/Subtitle.svelte';
  import CardTitle from '$lib/widgets/DOTphin/TimelineItem/Typography/Title.svelte';

  import { LL } from '$lib/shared/i18n/i18n-svelte';
</script>

<TimelineItem
  itemState={$state.evolution.status}
  stepTitle={$LL.multipass.state.evolveStep.stepTitle()}
  multiIcon
>
  <svelte:fragment slot="header">
    {#if $evolveStepState === 'COMPLETE'}
      <CardTitle content={$LL.multipass.state.evolveStep.COMPLETE.title()} />
    {:else}
      <TimelineActionButton
        disabled={$state.evolution.status !== 'active'}
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
          level: $state.evolution.level,
          maxLevel: MAX_EVOLUTION_LEVEL,
        })}
      </CardSubtitle>
    {/if}

    <a href="https://sovereignnature.com/dotphin" class="text-xs text-primary"
      >{$LL.multipass.state.evolveStep.INITIAL.moreInfo()}</a
    >
  </svelte:fragment>
</TimelineItem>
