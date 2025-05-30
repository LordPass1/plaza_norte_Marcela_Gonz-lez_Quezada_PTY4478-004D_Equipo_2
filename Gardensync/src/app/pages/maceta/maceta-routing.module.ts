import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MacetaPage } from './maceta.page';

const routes: Routes = [
  {
    path: '',
    component: MacetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MacetaPageRoutingModule {}
