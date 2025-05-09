import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuadminPageRoutingModule } from './menuadmin-routing.module';

import { MenuadminPage } from './menuadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuadminPageRoutingModule
  ],
  declarations: [MenuadminPage]
})
export class MenuadminPageModule {}
