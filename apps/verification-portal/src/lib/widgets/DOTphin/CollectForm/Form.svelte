<script lang="ts">
  import TileIcon from '$lib/widgets/DOTphin/CollectForm/TileIcon.svelte';
  import { multipassData } from '$lib/features/MultipassStates';
  import { claimProofByTraitType } from '$lib/features/DOTphin';

  let selectedValue: string | null = null;
  import { closeModal } from '$lib/widgets/DOTphin/collectModalStore';
  function handleTileClick(value: string) {
    selectedValue = value;
    handleSubmit();
  }

  function handleSubmit() {
    if ($multipassData.address && selectedValue !== null) {
      claimProofByTraitType(
        $multipassData.address,
        selectedValue as 'earth' | 'air' | 'water'
      );
      closeModal();
    }
  }
</script>

<form
  class="grid sm:grid-cols-3 grid-rows-3 sm:grid-rows-1 gap-4 w-full max-w-sm mx-auto"
  on:submit|preventDefault={handleSubmit}
>
  <TileIcon
    subtitle="Earth {$multipassData.proofStats.available.earth === 0
      ? '(unavailable)'
      : ''}"
    value="earth"
    disabled={$multipassData.proofStats.available.earth === 0}
    on:select={(e) => handleTileClick(e.detail.value)}
  >
    <div slot="icon">🌍</div>
  </TileIcon>

  <TileIcon
    subtitle="Air {$multipassData.proofStats.available.air === 0
      ? '(unavailable)'
      : ''}"
    value="air"
    disabled={$multipassData.proofStats.available.air === 0}
    on:select={(e) => handleTileClick(e.detail.value)}
  >
    <div slot="icon">☁️</div>
  </TileIcon>

  <TileIcon
    subtitle="Water {$multipassData.proofStats.available.water === 0
      ? '(unavailable)'
      : ''}"
    value="water"
    disabled={$multipassData.proofStats.available.water === 0}
    on:select={(e) => handleTileClick(e.detail.value)}
  >
    <div slot="icon">💧</div>
  </TileIcon>
</form>
