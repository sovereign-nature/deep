import { Component, Input } from '@angular/core';
import { Soul } from 'src/app/models/soul';

@Component({
  selector: 'sni-soul-table',
  templateUrl: './soul-table.component.html',
  styleUrls: ['./soul-table.component.scss'],
})
export class SoulTableComponent {
  @Input() souls!: Soul[];
}
