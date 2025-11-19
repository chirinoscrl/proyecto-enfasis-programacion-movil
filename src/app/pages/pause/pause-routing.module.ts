import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PausePage } from './pause.page';

const routes: Routes = [
  {
    path: '',
    component: PausePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PausePageRoutingModule {}
