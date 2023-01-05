import { Component, Input } from '@angular/core';
import { Soul } from 'src/app/models/soul';

@Component({
  selector: 'sni-soul-properties',
  templateUrl: './soul-properties.component.html',
  styleUrls: ['./soul-properties.component.scss'],
})
export class SoulPropertiesComponent {
  @Input() properties?: Partial<Soul>;
}
