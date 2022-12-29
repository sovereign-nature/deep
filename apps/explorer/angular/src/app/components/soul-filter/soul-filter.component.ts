import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest, debounceTime, Observable, switchMap, tap } from 'rxjs';
import { Soul } from 'src/app/models/soul';
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
    this.formFilter = fb.group({
      searchById: [''],
      soulStatus: ['-1'],
      createdDate: [''],
      updatedDate: [''],
    });

    this.formFilter.valueChanges.pipe(debounceTime(1000)).subscribe((val) => {
      this.soulService.setFilterToSouls(val);
      this.addFilterQueryParams(val);
    });
  }

  addFilterQueryParams(form: any) {
    const queryParams: Params = form;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
