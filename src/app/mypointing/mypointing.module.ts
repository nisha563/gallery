import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypointingPageRoutingModule } from './mypointing-routing.module';

import { MypointingPage } from './mypointing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MypointingPageRoutingModule
  ],
  declarations: [MypointingPage]
})
export class MypointingPageModule {}
