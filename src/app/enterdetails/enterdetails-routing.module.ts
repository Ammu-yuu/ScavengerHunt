import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterdetailsPage } from './enterdetails.page';

const routes: Routes = [
  {
    path: '',
    component: EnterdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterdetailsPageRoutingModule {}
