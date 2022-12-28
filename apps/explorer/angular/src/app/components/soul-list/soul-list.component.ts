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
        if (Object.keys(filters).length > 0) {
          return soul.filter((items) => {
            return (
              items.id === filters.searchById || items.status === filters.status
            );
          });
        }
        return soul;
      })
    );
  }
}
