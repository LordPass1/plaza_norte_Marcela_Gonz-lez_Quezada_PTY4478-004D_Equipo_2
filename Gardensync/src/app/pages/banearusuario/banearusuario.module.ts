import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BanearusuarioPageRoutingModule } from './banearusuario-routing.module';

import { BanearusuarioPage } from './banearusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BanearusuarioPageRoutingModule
  ],
  declarations: [BanearusuarioPage]
})
export class BanearusuarioPageModule {}
