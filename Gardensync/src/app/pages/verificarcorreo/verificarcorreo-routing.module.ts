import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificarcorreoPage } from './verificarcorreo.page';

const routes: Routes = [
  {
    path: '',
    component: VerificarcorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificarcorreoPageRoutingModule {}
