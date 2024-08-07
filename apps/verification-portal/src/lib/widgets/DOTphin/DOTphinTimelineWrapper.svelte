<script lang="ts">
  import DoTphinTimeline from './DOTphinTimeline.svelte';
  import MultipassHeader from './MultipassHeader.svelte';
  export let state: 'initial' | 'unlock' | 'evolve' | 'noProof' = 'evolve';
</script>

<div class="mb-4 flex gap-4 font-aeonik opacity-50">
  <h3>Test states:</h3>
  <label>
    <input type="radio" bind:group={state} value="initial" />
    No Proofs
  </label>
  <label>
    <input type="radio" bind:group={state} value="unlock" />
    No NFT
  </label>

  <label>
    <input type="radio" bind:group={state} value="evolve" />
    Evolve
  </label>
  <label>
    <input type="radio" bind:group={state} value="noProof" />
    All Proofs used
  </label>
</div>
<div class="grid grid-cols-1 py-4 mx-4 md:mx-0 mb-16">
  <MultipassHeader name="DOTphin" />
  <div class="hidden lg:block">
    <DoTphinTimeline order="horizontal" {state} />
  </div>
  <div class=" lg:hidden">
    <DoTphinTimeline order="vertical" {state} />
  </div>
</div>
