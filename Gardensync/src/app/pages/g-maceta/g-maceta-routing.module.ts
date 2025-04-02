import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GMacetaPage } from './g-maceta.page';

const routes: Routes = [
  {
    path: '',
    component: GMacetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GMacetaPageRoutingModule {}
