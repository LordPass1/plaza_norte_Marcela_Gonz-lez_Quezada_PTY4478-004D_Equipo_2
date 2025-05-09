import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BanearusuarioPage } from './banearusuario.page';

const routes: Routes = [
  {
    path: '',
    component: BanearusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BanearusuarioPageRoutingModule {}
