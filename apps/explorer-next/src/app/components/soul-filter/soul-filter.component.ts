import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
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
      searchById: '',
      soulStatus: -1,
      createdDate: 0,
      updatedDate: 0,
    });

    this.formFilter.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((val: SoulFilter) => {
        this.soulService.setFilterToSouls(val);
        this.addFilterQueryParams(val);
      });
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
