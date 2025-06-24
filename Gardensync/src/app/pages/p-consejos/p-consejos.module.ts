import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PConsejosPageRoutingModule } from './p-consejos-routing.module';

import { PConsejosPage } from './p-consejos.page';
import { ChatAsistenteComponent } from 'src/app/components/chat-asistente/chat-asistente.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PConsejosPageRoutingModule
  ],
  declarations: [PConsejosPage, ChatAsistenteComponent]
})
export class PConsejosPageModule {}
