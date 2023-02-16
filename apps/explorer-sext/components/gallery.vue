<script setup lang="ts">
import _ from 'lodash';
import { getLions } from '~~/queries';

// const page = ref(1);

const { data, pending } = await useAsyncQuery<any>(getLions);

// function next() {
//   if (pending.value) return;

//   page.value++;
//   refresh();
// }

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const scrollComponent = ref(null);
const handleScroll = (_e: Event) => {
  // let element = scrollComponent.value;
  // if (element.getBoundingClientRect().bottom < window.innerHeight) {
  //   next();
  // }
};
</script>
<template>
  <div
    v-if="!pending"
    ref="scrollComponent"
    class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <GalleryCard
      v-for="sni in data?.snis"
      :key="sni.tokenId"
      :image-url="prepareURL(sni.image)"
      :title="_.startCase(sni.name)"
      :description="sni.description"
      :page-url="`/identifiers/0x07e0ad7e038b554c9b369a927e38c2b8389d0ba0/${sni.tokenId}`" />
  </div>
</template>
