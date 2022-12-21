import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, shareReplay } from 'rxjs/operators';
import { SNI } from '../models/sni';
import { SOULS_LIST } from '../queries/sni';

@Injectable({
  providedIn: 'root',
})
export class SoulService {
  constructor(private apollo: Apollo) {}

  getSoulsList() {
    return this.apollo
      .watchQuery<SNI>({
        query: SOULS_LIST,
      })
      .valueChanges.pipe(
        map((val) => val.data.snis),
        shareReplay()
      );
  }
}
