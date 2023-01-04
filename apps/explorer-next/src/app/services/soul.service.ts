import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SNIDetail, SNIList } from '../models/sni';
import { SOULS_LIST, SOUL_DETAIL } from '../queries/sni';

@Injectable({
  providedIn: 'root',
})
export class SoulService {
  private subject = new BehaviorSubject<any>({});
  filteredSouls$: Observable<any> = this.subject.asObservable();

  constructor(private apollo: Apollo) {}

  getSoulsList() {
    return this.apollo
      .watchQuery<SNIList>({
        query: SOULS_LIST,
      })
      .valueChanges.pipe(
        map((val) => val.data.snis),
        shareReplay()
      );
  }

  getSoulDetailsById(soulId: string) {
    return this.apollo
      .watchQuery<SNIDetail>({
        query: SOUL_DETAIL,
        variables: {
          sniId: soulId,
        },
      })
      .valueChanges.pipe(
        map((val) => val?.data?.sni),
        map(({ __typename, ...val }) => val),
        shareReplay()
      );
  }

  setFilterToSouls(data: any) {
    this.subject.next(data);
  }
}
