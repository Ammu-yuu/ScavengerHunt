import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterdetailsPageRoutingModule } from './enterdetails-routing.module';

import { EnterdetailsPage } from './enterdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterdetailsPageRoutingModule
  ],
  declarations: [EnterdetailsPage]
})
export class EnterdetailsPageModule {}
