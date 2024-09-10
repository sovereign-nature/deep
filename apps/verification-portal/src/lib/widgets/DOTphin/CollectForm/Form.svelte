<script lang="ts">
  import TileIcon from '$lib/widgets/DOTphin/CollectForm/TileIcon.svelte';

  let selectedValue: string | null = null;

  function handleTileClick(value: string) {
    selectedValue = value;
    handleSubmit();
  }

  function handleSubmit() {
    console.log('Submitted value:', selectedValue);
  }

  //TODO: connect to proof logic
</script>

<form
  class="grid sm:grid-cols-3 grid-rows-3 sm:grid-rows-1 gap-4 w-full max-w-sm mx-auto"
  on:submit|preventDefault={handleSubmit}
>
  <TileIcon
    subtitle="Earth"
    value="earth"
    on:select={(e) => handleTileClick(e.detail.value)}
  >
    <div slot="icon">🌍</div>
  </TileIcon>
  <TileIcon
    value="air"
    subtitle="Air (unavailable)"
    disabled
    on:select={(e) => handleTileClick(e.detail.value)}
  >
    <div slot="icon">☁️</div>
  </TileIcon>

  <TileIcon
    subtitle="Water"
    value="water"
    on:select={(e) => handleTileClick(e.detail.value)}
  >
    <div slot="icon">💧</div>
  </TileIcon>
</form>

{#if selectedValue}
  <p class="text-center mt-4">You selected: {selectedValue}</p>
{/if}
