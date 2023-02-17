import { Component, Input } from '@angular/core';
import { Attributes } from 'src/app/models/metadata';
import { Soul } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

@Component({
  selector: 'sni-soul-image',
  templateUrl: './soul-image.component.html',
  styleUrls: ['./soul-image.component.scss'],
})
export class SoulImageComponent {
  @Input() properties?: Partial<Soul>;

  constructor(private soulService: SoulService) {}

  filterImage(att: Attributes[]) {
    return this.soulService.filterByCondition(att, true);
  }

  ipfsToUrl(address: string): string {
    return `https://ipfs.io/ipfs/${address.replace('ipfs://', '')}`;
  }

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
