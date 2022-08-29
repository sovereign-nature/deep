<!-- eslint-disable -->
<template>
  <div id="map" class="w-full h-screen"></div>
</template>

<script lang="ts">
// eslint-disable-next-line import/default
import mapboxgl from 'mapbox-gl'

import { defineComponent } from 'vue'

// eslint-disable-next-line import/no-named-as-default-member
const { Map, Popup, Marker } = mapboxgl

export default defineComponent({
  data() {
    return {
      access_token:
        'pk.eyJ1IjoiZ2lvdmFubmVndWVycmEiLCJhIjoiY2w2bTFkOHd2MGg2MjNicnVyNHR4ZG5mYiJ9.MouD-LX3BD8dH-pewUSHTw',
      deCeuvel: [4.908977760292588, 52.394935398381165]
    }
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css'
      }
    ]
  },
  mounted() {
    this.createMap()
  },
  methods: {
    createMap() {
      const map = new Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        zoom: 14,
        center: this.deCeuvel,
        accessToken: this.access_token
      })
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

      const htmlPopup =
        '<div class="popup"><div class="popup__image"></div><h1 class="popup__title">De Ceuvel</h1><p class="popup__text">DCVL</p><a class="popup__button" href="#">Contribute</a></div>'

      // create the popup
      const popup = new Popup({
        offset: 25,
        className: 'dcvl'
      }).setHTML(htmlPopup)

      // create DOM element for the marker
      const el = document.createElement('div')
      el.id = 'marker'

      // create the marker
      new Marker(el).setLngLat(this.deCeuvel).setPopup(popup).addTo(map)
    }
  }
})
</script>
<style>
#map {
  width: 100%;
  height: 24rem;
}

#marker {
  display: block;
  background: url('~/assets/images/deceuvel.jpg');
  background-position: center;
  background-size: cover;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  cursor: pointer;
}
</style>
