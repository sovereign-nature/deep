import { Component, Input } from '@angular/core';
import { SoulProperty } from 'src/app/models/soul';

@Component({
  selector: 'sni-soul-properties',
  templateUrl: './soul-properties.component.html',
  styleUrls: ['./soul-properties.component.scss'],
})
export class SoulPropertiesComponent {
  @Input() properties?: SoulProperty;
}
