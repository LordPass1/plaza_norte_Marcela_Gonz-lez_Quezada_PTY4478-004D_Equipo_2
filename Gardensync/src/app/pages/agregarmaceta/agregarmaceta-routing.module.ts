import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarmacetaPage } from './agregarmaceta.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarmacetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarmacetaPageRoutingModule {}
