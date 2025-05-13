import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosregistradosPageRoutingModule } from './usuariosregistrados-routing.module';

import { UsuariosregistradosPage } from './usuariosregistrados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosregistradosPageRoutingModule
  ],
  declarations: [UsuariosregistradosPage]
})
export class UsuariosregistradosPageModule {}
