import { Component, Input, OnInit } from '@angular/core';
import { GeoJsonProperties } from 'geojson';
import { parseFromWK } from 'wkt-parser-helper';

import { mapOptions, markerOptions } from '../../models/map-properties';

@Component({
  selector: 'sni-soul-map',
  templateUrl: './soul-map.component.html',
  styleUrls: ['./soul-map.component.scss'],
})
export class SoulMapComponent implements OnInit {
  @Input() map?: string;
  mapOptions: google.maps.MapOptions = mapOptions;
  markerOptions: google.maps.MarkerOptions = markerOptions;
  width = '1240px';
  height = '600px';

  ngOnInit() {
    // UGLY WORKAROUND DUE TO FAST DELIVERY, REFACTOR ASAP
    if (window.innerWidth < 1440) {
      this.width = '880px';
      if (window.innerWidth < 1024) {
        this.width = '640px';
      }
      if (window.innerWidth < 480) {
        this.width = '320px';
        this.height = '320px';
        if (window.innerWidth < 420) {
          this.width = '240px';
          this.height = '240px';
        }
      }
    }
  }

  wktToGeoJson(geometry: string): google.maps.LatLng {
    const geoJson: GeoJsonProperties = parseFromWK(geometry);
    const bounds = new google.maps.LatLng(
      geoJson['coordinates'][1],
      geoJson['coordinates'][0]
    );
    return bounds;
  }
}
