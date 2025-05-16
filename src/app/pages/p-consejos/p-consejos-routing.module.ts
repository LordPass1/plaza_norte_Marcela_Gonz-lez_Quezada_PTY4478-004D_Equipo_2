import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PConsejosPage } from './p-consejos.page';

const routes: Routes = [
  {
    path: '',
    component: PConsejosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PConsejosPageRoutingModule {}
