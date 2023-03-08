import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime, map } from 'rxjs';
import { SoulFilter } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

@Component({
  selector: 'sni-soul-filter',
  templateUrl: './soul-filter.component.html',
  styleUrls: ['./soul-filter.component.scss'],
})
export class SoulFilterComponent {
  formFilter: FormGroup;

  constructor(
    private fb: FormBuilder,
    private soulService: SoulService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formFilter = fb.group<SoulFilter>({
      searchById: undefined,
      soulStatus: -1,
      createdDate: undefined,
      updatedDate: undefined,
    });

    this.formFilter.valueChanges
      .pipe(
        map((filtersData: SoulFilter) => {
          filtersData.searchById
            ? +filtersData.searchById
            : (filtersData.searchById = undefined);
          filtersData.soulStatus == -1
            ? (filtersData.soulStatus = undefined)
            : filtersData.soulStatus;
          filtersData.createdDate
            ? (filtersData.createdDate = this.formatDateToUnix(
                filtersData.createdDate
              ))
            : (filtersData.createdDate = 0);
          filtersData.updatedDate
            ? (filtersData.updatedDate = this.formatDateToUnix(
                filtersData.updatedDate
              ))
            : (filtersData.updatedDate = 0);

          return filtersData;
        }),
        debounceTime(1000)
      )
      .subscribe((filters: SoulFilter) => {
        this.soulService.setFilterToSouls(filters);
        this.addFilterQueryParams(filters);
      });
  }

  formatDateToUnix(date: number | undefined): number | undefined {
    return (
      Math.floor(
        new Date(date?.toString().replaceAll('-', '/') + ' 00:00:00').getTime()
      ) / 1000
    );
  }

  addFilterQueryParams(form: SoulFilter) {
    const queryParams: Params = form;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
