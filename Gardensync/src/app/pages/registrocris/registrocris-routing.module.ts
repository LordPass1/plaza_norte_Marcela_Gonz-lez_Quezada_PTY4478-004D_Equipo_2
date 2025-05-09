import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrocrisPage } from './registrocris.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrocrisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrocrisPageRoutingModule {}
