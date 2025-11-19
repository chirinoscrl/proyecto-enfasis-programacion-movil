import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorldSelectPage } from './world-select.page';

const routes: Routes = [
  {
    path: '',
    component: WorldSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorldSelectPageRoutingModule {}
