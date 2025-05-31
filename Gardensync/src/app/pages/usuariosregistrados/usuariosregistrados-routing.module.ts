import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosregistradosPage } from './usuariosregistrados.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosregistradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosregistradosPageRoutingModule {}
