import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PausePageRoutingModule } from './pause-routing.module';

import { PausePage } from './pause.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PausePageRoutingModule
  ],
  declarations: [PausePage]
})
export class PausePageModule {}
