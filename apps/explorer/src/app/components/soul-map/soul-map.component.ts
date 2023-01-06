import { Component, Input } from '@angular/core';
import { GeoJsonProperties } from 'geojson';
import { parseFromWK } from 'wkt-parser-helper';

import { mapOptions, markerOptions } from '../../models/map-properties';

@Component({
  selector: 'sni-soul-map',
  templateUrl: './soul-map.component.html',
  styleUrls: ['./soul-map.component.scss'],
})
export class SoulMapComponent {
  @Input() map?: string;

  mapOptions: google.maps.MapOptions = mapOptions;

  markerOptions: google.maps.MarkerOptions = markerOptions;

  wktToGeoJson(geometry: string): google.maps.LatLng {
    const geoJson: GeoJsonProperties = parseFromWK(geometry);
    const bounds = new google.maps.LatLng(
      geoJson['coordinates'][1],
      geoJson['coordinates'][0]
    );
    return bounds;
  }
}
