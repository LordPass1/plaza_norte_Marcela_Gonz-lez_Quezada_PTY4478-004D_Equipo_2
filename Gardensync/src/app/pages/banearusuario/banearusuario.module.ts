import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BanearusuarioPageRoutingModule } from './banearusuario-routing.module';

import { BanearusuarioPage } from './banearusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BanearusuarioPageRoutingModule
  ],
  declarations: [BanearusuarioPage]
})
export class BanearusuarioPageModule {}
