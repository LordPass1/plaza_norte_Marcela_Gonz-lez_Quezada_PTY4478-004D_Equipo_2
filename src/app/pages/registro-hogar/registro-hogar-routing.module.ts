import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroHogarPage } from './registro-hogar.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroHogarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroHogarPageRoutingModule {}
