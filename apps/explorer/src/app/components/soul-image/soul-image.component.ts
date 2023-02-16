import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Attributes, Metadata } from 'src/app/models/metadata';
import { Soul } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

@Component({
  selector: 'sni-soul-image',
  templateUrl: './soul-image.component.html',
  styleUrls: ['./soul-image.component.scss'],
})
export class SoulImageComponent implements OnInit {
  @Input() properties?: Partial<Soul>;
  metadata$?: Observable<Metadata>;

  constructor(private soulService: SoulService) {}

  ngOnInit(): void {
    this.metadata$ = this.soulService.getMetadata(
      this.properties?.tokenURI?.replace('ipfs://', '') ?? ''
    );
  }

  filterImage(att: Attributes[]) {
    return this.soulService.filterByCondition(att, true);
  }

  ipfsToUrl(address: string): string {
    return `https://ipfs.io/ipfs/${address.replace('ipfs://', '')}`;
  }
}
