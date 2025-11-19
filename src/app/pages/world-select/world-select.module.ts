import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorldSelectPageRoutingModule } from './world-select-routing.module';

import { WorldSelectPage } from './world-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorldSelectPageRoutingModule
  ],
  declarations: [WorldSelectPage]
})
export class WorldSelectPageModule {}
