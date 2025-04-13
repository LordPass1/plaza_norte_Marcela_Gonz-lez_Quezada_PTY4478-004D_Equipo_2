import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciarPersonaPage } from './iniciar-persona.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarPersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarPersonaPageRoutingModule {}
