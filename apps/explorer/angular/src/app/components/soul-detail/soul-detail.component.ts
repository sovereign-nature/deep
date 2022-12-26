import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Soul, SoulProperty } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';
@Component({
  selector: 'sni-soul-detail',
  templateUrl: './soul-detail.component.html',
  styleUrls: ['./soul-detail.component.scss'],
})
export class SoulDetailComponent implements OnInit {
  detail$!: Observable<Partial<Soul>>;
  property$!: Observable<SoulProperty>;

  constructor(
    private route: ActivatedRoute,
    private soulService: SoulService
  ) {}

  ngOnInit() {
    const soulId = this.route.snapshot.paramMap.get('soulId') ?? '';

    this.detail$ = this.soulService
      .getSoulDetailsById(soulId)
      .pipe(
        map(
          ({
            conservationStatus,
            description,
            geometry,
            image,
            oracle,
            statusDescription,
            symbol,
            taxonId,
            tokenId,
            tokenURI,
            ...details
          }): Soul => details
        )
      );

    this.property$ = this.soulService
      .getSoulDetailsById(soulId)
      .pipe(
        map(
          ({
            collectionName,
            createdAt,
            id,
            name,
            owner,
            status,
            updatedAt,
            ...properties
          }): SoulProperty => properties as SoulProperty
        )
      );
  }
}
