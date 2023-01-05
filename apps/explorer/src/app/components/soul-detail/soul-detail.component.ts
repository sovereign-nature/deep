import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, shareReplay, tap } from 'rxjs';
import { Soul } from 'src/app/models/soul';
import { SOUL_DETAIL, SOUL_PROPERTY } from 'src/app/queries/sni';
import { SoulService } from 'src/app/services/soul.service';
@Component({
  selector: 'sni-soul-detail',
  templateUrl: './soul-detail.component.html',
  styleUrls: ['./soul-detail.component.scss'],
})
export class SoulDetailComponent implements OnInit {
  detail$!: Observable<Partial<Soul>>;
  property$!: Observable<Partial<Soul>>;
  soulId?: string;

  constructor(
    private route: ActivatedRoute,
    private soulService: SoulService
  ) {}

  ngOnInit() {
    this.soulId = this.route.snapshot.paramMap.get('soulId') ?? '';

    this.detail$ = this.soulService
      .getSoulDataById(this.soulId, SOUL_DETAIL)
      .pipe(shareReplay());

    this.property$ = this.soulService
      .getSoulDataById(this.soulId, SOUL_PROPERTY)
      .pipe(
        tap((val) => console.log(val)),
        shareReplay()
      );
  }
}
