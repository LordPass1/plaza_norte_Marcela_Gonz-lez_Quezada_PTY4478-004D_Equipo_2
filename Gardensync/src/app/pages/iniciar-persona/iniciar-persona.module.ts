import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciarPersonaPageRoutingModule } from './iniciar-persona-routing.module';

import { IniciarPersonaPage } from './iniciar-persona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciarPersonaPageRoutingModule
  ],
  declarations: [IniciarPersonaPage]
})
export class IniciarPersonaPageModule {}
