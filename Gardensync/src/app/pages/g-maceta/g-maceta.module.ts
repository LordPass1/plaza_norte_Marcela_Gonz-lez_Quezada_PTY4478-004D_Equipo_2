import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GMacetaPageRoutingModule } from './g-maceta-routing.module';

import { GMacetaPage } from './g-maceta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GMacetaPageRoutingModule
  ],
  declarations: [GMacetaPage]
})
export class GMacetaPageModule {}
