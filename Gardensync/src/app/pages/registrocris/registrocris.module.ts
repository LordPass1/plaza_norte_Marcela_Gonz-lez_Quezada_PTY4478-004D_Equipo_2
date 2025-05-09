import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrocrisPageRoutingModule } from './registrocris-routing.module';

import { RegistrocrisPage } from './registrocris.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrocrisPageRoutingModule
  ],
  declarations: [RegistrocrisPage]
})
export class RegistrocrisPageModule {}
