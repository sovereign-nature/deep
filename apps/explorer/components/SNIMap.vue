<template>
  <div>
    <MapboxMap
      ref="mapboxMap"
      :access-token="accessToken"
      map-style="mapbox://styles/mapbox/dark-v10"
      :center="location"
      :zoom="14"
      class="h-96 w-full"
    >
      <MapboxMarker :lng-lat="location" popup>
        <template #popup>
          <div class="flex flex-col text-center text-base">
            <h1 class="text-lg">De Ceuvel</h1>
            <p class="font-bold">DCVL</p>
          </div>
        </template>
        <div
          class="block h-16 w-16 cursor-pointer rounded-full bg-deCeuvel bg-cover bg-center"
        ></div>
      </MapboxMarker>
    </MapboxMap>
  </div>
</template>

<script setup lang="ts">
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
const config = useRuntimeConfig()

const accessToken = config.public.MAPBOX_TOKEN
const location = [4.908977760292588, 52.394935398381165]
</script>
