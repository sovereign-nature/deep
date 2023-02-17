import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Attributes } from 'src/app/models/metadata';
import { Soul } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

@Component({
  selector: 'sni-soul-properties',
  templateUrl: './soul-properties.component.html',
  styleUrls: ['./soul-properties.component.scss'],
})
export class SoulPropertiesComponent {
  @Input() properties?: Partial<Soul>;
  prides?: string[];

  constructor(
    private soulService: SoulService,
    private cdref: ChangeDetectorRef
  ) {}

  filterAttributes(att: Attributes[]) {
    const attributes = this.soulService.filterByCondition(att, false);
    return attributes.filter((val) => val.trait_type !== 'prides');
  }

  removeUnderline(value: string): string {
    return value.replace(/_/g, ' ');
  }

  ngAfterContentChecked() {
    this.prides = this.properties?.metadata?.attributes
      .filter((val) => val.trait_type === 'prides')[0]
      .value.split(',');
    this.cdref.detectChanges();
  }
}
