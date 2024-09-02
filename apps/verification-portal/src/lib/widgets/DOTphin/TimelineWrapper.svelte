<script lang="ts">
  import MultipassHeader from '$lib/widgets/DOTphin/MultipassHeader.svelte';
  import TestStateForm from '$lib/widgets/DOTphin/TestStateForm.svelte';
  import Timeline from '$lib/widgets/DOTphin/Timeline.svelte';
</script>

<div class="bg-gray-100 p-10 mb-2">
  <TestStateForm />
</div>
<div class="grid grid-cols-1 py-4 md:py-4 mx-4 md:mx-0 mb-16">
  <MultipassHeader name="DOTphin" />
  <div class="hidden lg:block">
    <Timeline order="horizontal" />
  </div>
  <div class=" lg:hidden">
    <Timeline order="vertical" />
  </div>
</div>
