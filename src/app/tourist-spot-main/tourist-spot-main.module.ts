import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TouristSpotMainPageRoutingModule } from './tourist-spot-main-routing.module';

import { TouristSpotMainPage } from './tourist-spot-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TouristSpotMainPageRoutingModule
  ],
  declarations: [TouristSpotMainPage]
})
export class TouristSpotMainPageModule {}
