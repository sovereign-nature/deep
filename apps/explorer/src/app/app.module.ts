import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryCache } from '@apollo/client/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SoulDetailComponent } from './components/soul-detail/soul-detail.component';
import { SoulFilterComponent } from './components/soul-filter/soul-filter.component';
import { SoulHeaderComponent } from './components/soul-header/soul-header.component';
import { SoulImageComponent } from './components/soul-image/soul-image.component';
import { SoulListComponent } from './components/soul-list/soul-list.component';
import { SoulMapComponent } from './components/soul-map/soul-map.component';
import { SoulPropertiesComponent } from './components/soul-properties/soul-properties.component';
import { SoulTableComponent } from './components/soul-table/soul-table.component';
import { StatusPipe } from './pipes/status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SoulListComponent,
    SoulDetailComponent,
    SoulTableComponent,
    SoulPropertiesComponent,
    SoulImageComponent,
    SoulMapComponent,
    SoulFilterComponent,
    StatusPipe,
    SoulHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule,
    GoogleMapsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.apiUrl,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
