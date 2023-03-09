import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { Soul, SoulFilter } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

@Component({
  selector: 'sni-soul-list',
  templateUrl: './soul-list.component.html',
  styleUrls: ['./soul-list.component.scss'],
})
export class SoulListComponent implements OnInit {
  data$?: Observable<Soul[]>;
  soulList$?: Observable<Soul[]>;
  soulList?: Soul[];
  nextSouls?: Observable<Soul[]>;
  soulFilter?: SoulFilter;

  constructor(private soulService: SoulService) {}

  ngOnInit() {
    this.data$ = combineLatest([
      this.soulService.getSoulsList(),
      this.soulService.filteredSouls$,
    ]).pipe(
      map(([souls, filters]) => {
        this.soulService
          .getSoulsList(
            '',
            filters.soulStatus,
            filters.createdDate,
            filters.updatedDate,
            filters.searchById
          )
          .pipe(
            tap((filteredSouls) => {
              filters
                ? (this.soulList = filteredSouls)
                : (this.soulList = souls);
            })
          )
          .subscribe();
        return souls;
      })
    );
  }

  onScroll() {
    console.log('scroll');
    const last = this.soulList?.at(-1);
    if (last) {
      this.soulService.getSoulsList(last.id).subscribe((souls) => {
        this.soulList = this.soulList?.concat(souls);
      });
    }
  }
}
