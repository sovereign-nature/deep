<template>
  <div>
    <MapboxMap
      ref="mapboxMap"
      :access-token="accessToken"
      map-style="mapbox://styles/mapbox/dark-v10"
      :center="transformToLatitudeAndLongitude(geometry)"
      :zoom="14"
      class="h-96 w-full"
    >
      <MapboxMarker
        :lng-lat="transformToLatitudeAndLongitude(geometry)"
        color="#5c7f67"
      >
      </MapboxMarker>
    </MapboxMap>
  </div>
</template>

<script setup lang="ts">
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
const config = useRuntimeConfig()

const accessToken = config.public.mapboxToken

function transformToLatitudeAndLongitude(geometry): number[] {
  return geometry
    .substring(6, geometry.length - 1)
    .split(' ')
    .map((x) => +x)
}

defineProps({
  geometry: {
    type: String,
    required: false,
    default: String
  }
})
</script>
