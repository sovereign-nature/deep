import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SoulListComponent } from './components/soul-list/soul-list.component';
import { SoulDetailComponent } from './components/soul-detail/soul-detail.component';
import { SoulTableComponent } from './components/soul-table/soul-table.component';
import { SoulPropertiesComponent } from './components/soul-properties/soul-properties.component';
import { SoulImageComponent } from './components/soul-image/soul-image.component';

@NgModule({
  declarations: [
    AppComponent,
    SoulListComponent,
    SoulDetailComponent,
    SoulTableComponent,
    SoulPropertiesComponent,
    SoulImageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://api.thegraph.com/subgraphs/name/sovereign-nature/sni',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
