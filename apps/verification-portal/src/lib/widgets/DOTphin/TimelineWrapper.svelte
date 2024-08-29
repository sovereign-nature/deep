<script lang="ts">
  import MultipassHeader from './MultipassHeader.svelte';
  import Timeline from './Timeline.svelte';
</script>

<div class="grid grid-cols-1 py-4 mx-4 md:mx-0 mb-16">
  <MultipassHeader name="DOTphin" />
  <div class="hidden lg:block">
    <Timeline order="horizontal" />
  </div>
  <div class=" lg:hidden">
    <Timeline order="vertical" />
  </div>
</div>
