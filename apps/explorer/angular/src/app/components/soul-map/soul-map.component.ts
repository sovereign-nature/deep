import { Component, Input } from '@angular/core';
import { parseFromWK } from 'wkt-parser-helper';
import { GeoJsonProperties } from 'geojson';

@Component({
  selector: 'sni-soul-map',
  templateUrl: './soul-map.component.html',
  styleUrls: ['./soul-map.component.scss'],
})
export class SoulMapComponent {
  @Input() map?: string;

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    clickable: false,
    icon: { url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' },
  };

  wktToGeoJson(geometry: string): google.maps.LatLng {
    const geoJson: GeoJsonProperties = parseFromWK(geometry);
    const bounds = new google.maps.LatLng(
      geoJson['coordinates'][1],
      geoJson['coordinates'][0]
    );
    return bounds;
  }
}
