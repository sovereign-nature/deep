import { Component, OnInit } from '@angular/core';
import { map, Observable, of, combineLatest } from 'rxjs';
import { format, fromUnixTime } from 'date-fns';
import { Soul, SoulFilter } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

@Component({
  selector: 'sni-soul-list',
  templateUrl: './soul-list.component.html',
  styleUrls: ['./soul-list.component.scss'],
})
export class SoulListComponent implements OnInit {
  souls$: Observable<Soul[]> = of([]);
  data$?: Observable<Soul[]>;

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

  filterByField(soul: Soul[], filters: SoulFilter) {
    if (Object.keys(filters).length > 0) {
      return soul.filter((items) => {
        if (filters.searchById) {
          return items.id.includes(filters.searchById);
        } else if (filters.createdDate) {
          return this.compareDates(filters.createdDate, items.createdAt);
        } else if (filters.updatedDate) {
          return this.compareDates(filters.updatedDate, items.updatedAt);
        } else {
          if (filters.soulStatus == -1) {
            return soul;
          }
          return items.status === filters.soulStatus;
        }
      });
    }
    return soul;
  }

  compareDates(filterDate: number, tableDate: number) {
    const formattedFilterDate = new Date(filterDate);
    const formattedTableDate = fromUnixTime(tableDate);
    return (
      format(formattedFilterDate, 'dd/MM/yyyy') ===
      format(formattedTableDate, 'dd/MM/yyyy')
    );
  }
}
