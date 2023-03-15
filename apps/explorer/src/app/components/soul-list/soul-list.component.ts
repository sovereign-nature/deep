import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { Soul } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

@Component({
  selector: 'sni-soul-list',
  templateUrl: './soul-list.component.html',
  styleUrls: ['./soul-list.component.scss'],
})
export class SoulListComponent implements OnInit {
  data$?: Observable<Soul[]>;
  soulList?: Soul[];

  constructor(private soulService: SoulService) {}

  ngOnInit() {
    this.data$ = combineLatest([
      this.soulService.getSoulsList(),
      this.soulService.filteredSouls$,
    ]).pipe(
      switchMap(([_, filters]) => {
        return this.soulService.getSoulsList(
          '',
          filters.soulStatus,
          filters.createdDate,
          filters.updatedDate,
          filters.searchById
        );
      })
    );
    this.data$.subscribe((souls) => (this.soulList = souls));
  }

  onScroll() {
    const last = this.soulList?.at(-1);
    if (last) {
      this.soulService.getSoulsList(last.id).subscribe((souls) => {
        this.soulList = this.soulList?.concat(souls);
      });
    }
  }
}
