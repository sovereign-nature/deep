import { Component, Input } from '@angular/core';

@Component({
  selector: 'sni-soul-image',
  templateUrl: './soul-image.component.html',
  styleUrls: ['./soul-image.component.scss'],
})
export class SoulImageComponent {
  @Input() imageProperties?: [imageUrl: string, imageAlt: string];

  ipfsToUrl(address: string): string {
    return `https://ipfs.io/ipfs/${address.substring(7)}`;
  }
}
