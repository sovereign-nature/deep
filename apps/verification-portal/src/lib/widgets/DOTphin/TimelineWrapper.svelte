<script lang="ts">
  import MultipassHeaderSM from '$lib/widgets/DOTphin/MultipassHeaderSM.svelte';
  import TestStateForm from '$lib/widgets/DOTphin/TestStateForm.svelte';
  import Timeline from '$lib/widgets/DOTphin/Timeline.svelte';
</script>

<div class="bg-gray-100 dark:bg-transparent p-10 mb-2">
  <TestStateForm />
</div>
<div class="grid grid-cols-1 py-4 md:py-4 mx-4 md:mx-0 mb-16">
  <MultipassHeaderSM name="DOTphin" />
  <div class="hidden lg:block">
    <Timeline order="horizontal" />
  </div>
  <div class=" lg:hidden">
    <Timeline order="vertical" />
  </div>
</div>
