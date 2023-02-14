import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'src/app/models/metadata';
import { Soul } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

@Component({
  selector: 'sni-soul-properties',
  templateUrl: './soul-properties.component.html',
  styleUrls: ['./soul-properties.component.scss'],
})
export class SoulPropertiesComponent implements OnInit {
  @Input() properties?: Partial<Soul>;
  metadata$?: Observable<Metadata>;

  constructor(private soulService: SoulService) {}

  ngOnInit(): void {
    this.metadata$ = this.soulService.getMetadata(
      this.properties?.tokenURI?.replace('ipfs://', '') ?? ''
    );
  }
}
