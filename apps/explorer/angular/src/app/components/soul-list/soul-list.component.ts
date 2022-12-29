import { Component, OnInit } from '@angular/core';
import {
  filter,
  map,
  Observable,
  of,
  startWith,
  tap,
  combineLatest,
} from 'rxjs';
import { Soul } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

@Component({
  selector: 'sni-soul-list',
  templateUrl: './soul-list.component.html',
  styleUrls: ['./soul-list.component.scss'],
})
export class SoulListComponent implements OnInit {
  souls$: Observable<Soul[]> = of([]);
  data$?: Observable<any[]>;

  constructor(private soulService: SoulService) {}

  ngOnInit() {
    this.souls$ = this.soulService.getSoulsList();
    this.data$ = combineLatest([
      this.soulService.getSoulsList(),
      this.soulService.filteredSouls$,
    ]).pipe(
      map(([soul, filters]) => {
        return this.filterByField(soul, filters);
      })
    );
  }

  filterByField(soul: Soul[], filters: any) {
    if (Object.keys(filters).length > 0) {
      return soul.filter((items) => {
        if (filters.searchById) {
          return items.id.includes(filters.searchById);
        } else if (filters.createdDate) {
          return items.createdAt === filters.createdDate;
        } else if (filters.updatedDate) {
          return items.updatedAt === filters.updatedDate;
        } else {
          if (filters.soulStatus === '-1') {
            return soul;
          }
          return items.status === filters.soulStatus;
        }
      });
    }
    return soul;
  }
}
