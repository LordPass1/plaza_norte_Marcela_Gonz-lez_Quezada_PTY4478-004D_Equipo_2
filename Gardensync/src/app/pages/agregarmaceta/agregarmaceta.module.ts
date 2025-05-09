import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarmacetaPageRoutingModule } from './agregarmaceta-routing.module';

import { AgregarmacetaPage } from './agregarmaceta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarmacetaPageRoutingModule
  ],
  declarations: [AgregarmacetaPage]
})
export class AgregarmacetaPageModule {}
