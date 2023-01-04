<template>
  <div>
    <MapboxMap
      ref="mapboxMap"
      :access-token="accessToken"
      map-style="mapbox://styles/mapbox/dark-v10"
      :center="wktToGeoJson(geometry)"
      :zoom="14"
      class="h-96 w-full">
      <MapboxMarker :lng-lat="wktToGeoJson(geometry)" color="#5c7f67">
      </MapboxMarker>
    </MapboxMap>
  </div>
</template>

<script setup lang="ts">
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import { parseFromWK } from 'wkt-parser-helper';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GeoJsonProperties } from 'geojson';
const config = useRuntimeConfig();

const accessToken = config.public.mapboxToken;

function wktToGeoJson(geometry: string): string {
  const geoJson: GeoJsonProperties = parseFromWK(geometry);
  return geoJson.coordinates;
}

defineProps({
  geometry: {
    type: String,
    required: false,
    default: String,
  },
});
</script>
