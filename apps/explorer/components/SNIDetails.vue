<template>
  <div class="w-full text-white">
    <h1 class="text-3xl">Details</h1>
    <div
      class="mt-6 w-full rounded-lg border-2 border-primary bg-base-content py-4 px-8"
    >
      <h1 class="mb-4 text-4xl">{{ detail[0].name }}</h1>
      <ul>
        <li class="my-2">Id: {{ detail[0].id }}</li>
        <li class="my-2">
          Conservation status: {{ detail[0].preservedSpecimen }}
        </li>
        <li class="my-2">Created: {{ detail[0].created }}</li>
        <li class="my-2">Updated: {{ detail[0].updated }}</li>
        <li class="my-2">Location: {{ detail[0].location }}</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: ['detail']
}
</script>
