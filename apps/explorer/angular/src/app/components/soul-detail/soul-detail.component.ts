import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Soul, SoulProperty } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';
@Component({
  selector: 'sni-soul-detail',
  templateUrl: './soul-detail.component.html',
  styleUrls: ['./soul-detail.component.scss'],
})
export class SoulDetailComponent implements OnInit {
  detail$!: Observable<Partial<Soul>>;
  property!: SoulProperty;

  constructor(
    private route: ActivatedRoute,
    private soulService: SoulService
  ) {}

  ngOnInit() {
    const soulId = this.route.snapshot.paramMap.get('soulId') ?? '';
    this.detail$ = this.soulService.getSoulDetailsById(soulId).pipe(
      //TODO: Refactor this to be more dynamic
      tap((soul: Soul) => {
        this.property = {
          conservationStatus: soul.conservationStatus,
          description: soul.description,
          geometry: soul.geometry,
          image: soul.image,
          oracle: soul.oracle,
          statusDescription: soul.statusDescription,
          symbol: soul.symbol,
          taxonId: soul.taxonId,
          tokenId: soul.tokenId,
          tokenURI: soul.tokenURI,
        } as SoulProperty;
      }),
      map((val) => {
        const {
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
        } = val;

        return details;
      })
    );
  }
}
