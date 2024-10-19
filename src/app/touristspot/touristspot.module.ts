import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TouristspotPageRoutingModule } from './touristspot-routing.module';
import { TsModalComponent } from '../ts-modal/ts-modal.component';
import { TouristspotPage } from './touristspot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TouristspotPageRoutingModule
  ],
  declarations: [TouristspotPage, TsModalComponent],
  entryComponents: [TsModalComponent]
})
export class TouristspotPageModule {}
