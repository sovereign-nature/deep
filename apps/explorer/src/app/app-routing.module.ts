import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoulDetailComponent } from './components/soul-detail/soul-detail.component';
import { SoulListComponent } from './components/soul-list/soul-list.component';

const routes: Routes = [
  {
    path: '',
    component: SoulListComponent,
  },
  {
    path: 'details/:soulId',
    component: SoulDetailComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
