import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TouristspotPage } from './touristspot.page';

const routes: Routes = [
  {
    path: '',
    component: TouristspotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TouristspotPageRoutingModule {}
