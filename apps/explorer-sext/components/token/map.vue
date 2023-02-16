<script setup lang="ts">
import { Map } from 'maplibre-gl';
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';

const map = shallowRef<Map>();
// const mapContainer = shallowRef();

onMounted(() => {
  const apiKey = 'SkFMlYF6p9Is2aPpffmJ';

  const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

  map.value = markRaw(
    new Map({
      container: 'map',
      style: `https://api.maptiler.com/maps/toner/style.json?key=${apiKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    })
  );
});

onUnmounted(() => {
  map.value?.remove();
});
</script>
<template>
  <div class="pr-8">
    <div id="map" style="height: 500px"></div>
  </div>
</template>
<style scoped>
@import 'maplibre-gl/dist/maplibre-gl.css';
</style>
