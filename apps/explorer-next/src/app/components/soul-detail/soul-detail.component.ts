import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
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
  soulId?: string;

  constructor(
    private route: ActivatedRoute,
    private soulService: SoulService
  ) {}

  ngOnInit() {
    this.soulId = this.route.snapshot.paramMap.get('soulId') ?? '';

    this.detail$ = this.soulService.getSoulDetailsById(this.soulId).pipe(
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
      ),
      shareReplay()
    );

    this.property$ = this.soulService.getSoulDetailsById(this.soulId).pipe(
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
      ),
      shareReplay()
    );
  }
}
