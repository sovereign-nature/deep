<script lang="ts">
  import { browser } from '$app/environment';
  import type { GeoJsonObject } from 'geojson';
  import type { Map as LeafletMap, GeoJSON } from 'leaflet';
  import { onDestroy, onMount } from 'svelte';
  export let geoJSONData: GeoJsonObject | undefined;

  let mapElement: HTMLDivElement;
  let map: LeafletMap;
  let geojsonLayer: GeoJSON;

  onMount(async () => {
    if (browser) {
      const leaflet = await import('leaflet');
      map = leaflet
        .map(mapElement, {
          zoomControl: true,
          attributionControl: false,
          scrollWheelZoom: false,
          dragging: false,
        })
        .setView([51.505, -0.09], 13);
      leaflet
        .tileLayer(
          //'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png'
          'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png'
        )
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

<div bind:this={mapElement} class="h-full" />

<style>
  @import 'leaflet/dist/leaflet.css';
</style>
