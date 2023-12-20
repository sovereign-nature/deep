<script lang="ts">
  import { browser } from '$app/environment';
  import type { GeoJsonObject } from 'geojson';
  import type { Map as LeafletMap, GeoJSON } from 'leaflet';
  import { onDestroy, onMount } from 'svelte';
  export let geoJSONData: GeoJsonObject | undefined;
  import 'leaflet/dist/leaflet.css';

  let mapElement: HTMLDivElement;
  let map: LeafletMap;
  let geojsonLayer: GeoJSON;

  onMount(async () => {
    if (browser) {
      const leaflet = await import('leaflet');

      map = leaflet
        .map(mapElement, {
          zoomControl: true,
          attributionControl: true,
          scrollWheelZoom: false,
          dragging: false,
        })
        .setView([51.505, -0.09], 13);

      map.attributionControl.setPrefix(false);

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',
        })
        .addTo(map);

      // Load GeoJSON data
      if (geoJSONData) {
        geojsonLayer = leaflet.geoJSON(geoJSONData).addTo(map);
        map.fitBounds(geojsonLayer.getBounds()).zoomOut(2);
      }
    }
  });

  onDestroy(async () => {
    if (map) {
      console.log('Unloading Leaflet map.');
      map.remove();
    }
  });
</script>

<!-- <link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  crossorigin=""
/> -->
<div bind:this={mapElement} class="min-h-inherit h-full" />

<!-- <style>
  @import 'leaflet/dist/leaflet.css';
</style> -->
