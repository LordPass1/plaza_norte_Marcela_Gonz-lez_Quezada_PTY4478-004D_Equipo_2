import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarclavePageRoutingModule } from './cambiarclave-routing.module';

import { CambiarclavePage } from './cambiarclave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CambiarclavePageRoutingModule
  ],
  declarations: [CambiarclavePage]
})
export class CambiarclavePageModule {}
