import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PConsejosPageRoutingModule } from './p-consejos-routing.module';

import { PConsejosPage } from './p-consejos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PConsejosPageRoutingModule
  ],
  declarations: [PConsejosPage]
})
export class PConsejosPageModule {}
