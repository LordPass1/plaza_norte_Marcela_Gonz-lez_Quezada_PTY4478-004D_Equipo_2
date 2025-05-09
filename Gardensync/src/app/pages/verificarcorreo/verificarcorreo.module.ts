import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarcorreoPageRoutingModule } from './verificarcorreo-routing.module';

import { VerificarcorreoPage } from './verificarcorreo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VerificarcorreoPageRoutingModule
  ],
  declarations: [VerificarcorreoPage]
})
export class VerificarcorreoPageModule {}
