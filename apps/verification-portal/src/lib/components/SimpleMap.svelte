<script lang="ts">
  import { browser } from '$app/environment';
  import type { Map as LeafletMap } from 'leaflet';
  import { onDestroy, onMount } from 'svelte';

  let mapElement: HTMLDivElement;
  let map: LeafletMap;

  onMount(async () => {
    if (browser) {
      const leaflet = await import('leaflet');
      map = leaflet
        .map(mapElement, {
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: false,
          dragging: false,
        })
        .setView([51.505, -0.09], 13);
      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
        )
        .addTo(map);
    }
  });

  onDestroy(async () => {
    if (map) {
      console.log('Unloading Leaflet map.');
      map.remove();
    }
  });
</script>

<div bind:this={mapElement} class="h-full" />

<style>
  @import 'leaflet/dist/leaflet.css';
</style>
