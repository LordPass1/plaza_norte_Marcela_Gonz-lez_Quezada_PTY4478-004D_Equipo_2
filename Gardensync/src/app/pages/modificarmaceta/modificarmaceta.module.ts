import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarmacetaPageRoutingModule } from './modificarmaceta-routing.module';

import { ModificarmacetaPage } from './modificarmaceta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModificarmacetaPageRoutingModule
  ],
  declarations: [ModificarmacetaPage]
})
export class ModificarmacetaPageModule {}
