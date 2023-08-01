<script setup lang="ts">
  export let data;
  </script>

<div class="flex flex-row">
  <div class="basis-1/3">
    <h1 class="text-xl text-white">Linked Animal { data.slug }</h1>
    <p>{ data.apiData.createdAt }</p>

    <div
      class="inline-flex h-[30px] w-[111px] items-center justify-center gap-2 rounded-[5px] bg-emerald-200 px-[107px] py-[11px]">
      <div class="text-center text-sm font-semibold text-black">Support</div>
    </div>
    <div class="relative h-1 w-[239px]">
      <div
        class="absolute left-0 top-0 h-1 w-[239px] rounded-[26px] bg-zinc-800"></div>
      <div
        class="absolute left-0 top-0 h-1 w-[97px] rounded-[26px] bg-gradient-to-l from-emerald-200 to-indigo-300"></div>
    </div>
    <img
      class="h-10 w-10 rounded-full"
      src="https://via.placeholder.com/27x29" />
    <p class="text-white">
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release
      of Letraset sheets containing Lorem Ipsum passages, and more recently
      with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </p>
  </div>
  <div class="basis-1/3">
    <h1 class="text-xl">Funds Generated</h1>
    <p class="text-white">
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release
      of Letraset sheets containing Lorem Ipsum passages, and more recently
      with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </p>
  </div>
  <div class="basis-1/3">
    <h1 class="text-xl">Conservation Information</h1>
    <p class="text-white">
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release
      of Letraset sheets containing Lorem Ipsum passages, and more recently
      with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </p>
  </div>
</div>
