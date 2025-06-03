import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { PPrincipalPageRoutingModule } from './p-principal-routing.module';

import { PPrincipalPage } from './p-principal.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    PPrincipalPageRoutingModule
  ],
  declarations: [PPrincipalPage]
})
export class PPrincipalPageModule {}
