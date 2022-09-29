<template>
  <div>
    <MapboxMap
      :access-token="accessToken"
      map-style="mapbox://styles/mapbox/dark-v10"
      :center="deCeuvel"
      :zoom="14"
      class="h-96 w-full"
    >
      <MapboxPopup :lng-lat="deCeuvel" offset="25">
        <div class="text-md flex flex-col text-center">
          <div
            class="block h-16 w-16 cursor-pointer self-center rounded-full bg-deCeuvel bg-cover bg-center"
          ></div>
          <h1 class="text-lg">De Ceuvel</h1>
          <p class="font-bold">DCVL</p>
          <a class="btn-primary btn mt-2 min-w-full text-xs" href="#"
            >Contribute</a
          >
        </div>
      </MapboxPopup>
      <MapboxMarker :lng-lat="deCeuvel">
        <div
          class="block h-16 w-16 cursor-pointer rounded-full bg-deCeuvel bg-cover bg-center"
        ></div>
      </MapboxMarker>
    </MapboxMap>
  </div>
</template>

<script setup lang="ts">
import { MapboxMap, MapboxMarker, MapboxPopup } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const accessToken =
  'pk.eyJ1IjoiZ2lvdmFubmVndWVycmEiLCJhIjoiY2w2bTFkOHd2MGg2MjNicnVyNHR4ZG5mYiJ9.MouD-LX3BD8dH-pewUSHTw'
const deCeuvel = [4.908977760292588, 52.394935398381165]
</script>

<!--
  TODO: TO EXCLUDE IT ASAP, JUST HERE FOR REFERENCE TO IMPLEMENT WITH MAPBOX-VUE

  map.on('load', () => {
    map.addSource('deCeuvel', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          // These coordinates outline Maine.
          coordinates: [
            [
              [4.904022216796875, 52.395623822243984],
              [4.905245304107666, 52.396867696079404],
              [4.911961555480957, 52.39445847705198],
              [4.912304878234863, 52.393777586967346],
              [4.911510944366455, 52.3930835920328],
              [4.911317825317383, 52.39318834668446],
              [4.911060333251953, 52.392900270794065],
              [4.910910129547119, 52.39293955398076],
              [4.911596775054932, 52.393581174413846],
              [4.911360740661621, 52.39365973954015],
              [4.9106526374816895, 52.39300502588086],
              [4.909579753875732, 52.39346332646218],
              [4.910802841186523, 52.39464179181838],
              [4.910373687744141, 52.39482510582336],
              [4.909193515777588, 52.39359426861126],
              [4.904043674468994, 52.3955583542288]
            ]
          ]
        }
      }
    })

    map.addLayer({
      id: 'deCeuvel',
      type: 'fill',
      source: 'deCeuvel', // reference the data source
      layout: {},
      paint: {
        'fill-color': '#AAE6B9',
        'fill-opacity': 0.5
      }
    })

    map.addLayer({
      id: 'outline',
      type: 'line',
      source: 'deCeuvel',
      layout: {},
      paint: {
        'line-color': '#FFF',
        'line-width': 1
      }
    })
  })
-->
