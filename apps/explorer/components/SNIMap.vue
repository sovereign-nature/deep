<template>
  <div>
    <MapboxMap
      ref="mapboxMap"
      :access-token="accessToken"
      map-style="mapbox://styles/mapbox/dark-v10"
      :center="deCeuvel"
      :zoom="14"
      class="h-96 w-full"
    >
      <MapboxMarker :lng-lat="deCeuvel" popup>
        <template v-slot:popup>
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

const accessToken =
  'pk.eyJ1IjoiZ2lvdmFubmVndWVycmEiLCJhIjoiY2w2bTFkOHd2MGg2MjNicnVyNHR4ZG5mYiJ9.MouD-LX3BD8dH-pewUSHTw'
const deCeuvel = [4.908977760292588, 52.394935398381165]
</script>
