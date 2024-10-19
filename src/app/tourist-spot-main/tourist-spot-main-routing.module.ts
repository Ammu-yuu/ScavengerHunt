import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TouristSpotMainPage } from './tourist-spot-main.page';

const routes: Routes = [
  {
    path: '',
    component: TouristSpotMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TouristSpotMainPageRoutingModule {}
