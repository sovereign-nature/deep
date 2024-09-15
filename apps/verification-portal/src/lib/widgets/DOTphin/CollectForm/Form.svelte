<script lang="ts">
  import TileIcon from '$lib/widgets/DOTphin/CollectForm/TileIcon.svelte';
  import { multipassData } from '$lib/features/MultipassStates';
  import { claimProofByTraitType } from '$lib/features/DOTphin';
  import Spinner from '$lib/components/icons/Spinner.svelte';

  let selectedValue: string | null = null;
  import { closeModal } from '$lib/widgets/DOTphin/collectModalStore';
  function handleTileClick(value: string) {
    selectedValue = value;
    handleSubmit();
  }
  let isSubmitting = false;

  async function handleSubmit() {
    if (isSubmitting) return;
    isSubmitting = true;

    if ($multipassData.address && selectedValue !== null) {
      await claimProofByTraitType(
        $multipassData.address,
        selectedValue as 'earth' | 'air' | 'water'
      ).finally(() => {
        isSubmitting = false;
        closeModal();
      });
    } else {
      isSubmitting = false;
    }
  }
</script>

<div class="h-6 mb-2 flex items-center justify-center w-full gap-4">
  {#if isSubmitting}
    <span class="text-sm"> Processing... </span>
    <Spinner className="h-4 w-4 text-primary-200" />
  {/if}
</div>
<form
  class="grid md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-4 w-full max-w-sm mx-auto"
  on:submit|preventDefault={handleSubmit}
>
  <TileIcon
    subtitle="Earth {$multipassData.proofStats.available.earth === 0
      ? '(unavailable)'
      : ''}"
    value="earth"
    disabled={$multipassData.proofStats.available.earth === 0 || isSubmitting}
    on:select={(e) => handleTileClick(e.detail.value)}
  >
    <div slot="icon">🌍</div>
  </TileIcon>

  <TileIcon
    subtitle="Air {$multipassData.proofStats.available.air === 0
      ? '(unavailable)'
      : ''}"
    value="air"
    disabled={$multipassData.proofStats.available.air === 0 || isSubmitting}
    on:select={(e) => handleTileClick(e.detail.value)}
  >
    <div slot="icon">☁️</div>
  </TileIcon>

  <TileIcon
    subtitle="Water {$multipassData.proofStats.available.water === 0
      ? '(unavailable)'
      : ''}"
    value="water"
    disabled={$multipassData.proofStats.available.water === 0 || isSubmitting}
    on:select={(e) => handleTileClick(e.detail.value)}
  >
    <div slot="icon">💧</div>
  </TileIcon>
</form>
