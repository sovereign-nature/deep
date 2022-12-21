import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, shareReplay } from 'rxjs/operators';
import { SNIDetail, SNIList } from '../models/sni';
import { SOULS_LIST, SOUL_DETAIL } from '../queries/sni';

@Injectable({
  providedIn: 'root',
})
export class SoulService {
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
        map((val) => val.data.sni),
        shareReplay()
      );
  }
}
