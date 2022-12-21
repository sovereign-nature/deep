import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

const SOULS_LIST = gql`
  query sniList {
    snis {
      id
      owner
      status
      createdAt
      updatedAt
      name
      collectionName
    }
  }
`;

interface SNI {
  snis: Soul[];
}

interface Soul {
  id: string;
  owner: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  collectionName: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular';
  souls$!: Observable<Soul[]>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.souls$ = this.apollo
      .watchQuery<SNI>({
        query: SOULS_LIST,
      })
      .valueChanges.pipe(
        map((val) => val.data.snis),
        shareReplay()
      );
  }
}
