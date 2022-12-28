import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs';
import { Soul } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

@Component({
  selector: 'sni-soul-filter',
  templateUrl: './soul-filter.component.html',
  styleUrls: ['./soul-filter.component.scss'],
})
export class SoulFilterComponent {
  formFilter: FormGroup;

  constructor(private fb: FormBuilder, private soulService: SoulService) {
    this.formFilter = fb.group({
      searchById: [''],
      soulStatus: [[]],
      createdDate: [''],
      updatedDate: [''],
    });

    this.formFilter.valueChanges.pipe(debounceTime(1000)).subscribe((val) => {
      this.soulService.setFilterToSouls(val);
    });
  }
}
