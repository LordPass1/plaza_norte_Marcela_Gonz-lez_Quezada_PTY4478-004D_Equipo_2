import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MacetaPageRoutingModule } from './maceta-routing.module';

import { MacetaPage } from './maceta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MacetaPageRoutingModule
  ],
  declarations: [MacetaPage]
})
export class MacetaPageModule {}
