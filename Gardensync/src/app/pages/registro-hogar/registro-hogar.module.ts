import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroHogarPageRoutingModule } from './registro-hogar-routing.module';

import { RegistroHogarPage } from './registro-hogar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroHogarPageRoutingModule
  ],
  declarations: [RegistroHogarPage]
})
export class RegistroHogarPageModule {}
