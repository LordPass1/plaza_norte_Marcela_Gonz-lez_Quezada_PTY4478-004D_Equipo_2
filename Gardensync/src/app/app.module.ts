import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseInitService } from 'src/firebase-init.service'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarMacetaFormModalComponent } from './components/agregar-maceta-form-modal/agregar-maceta-form-modal.component';
import { AgregarMacetaModalComponent } from './components/agregar-maceta-modal/agregar-maceta-modal.component';
import { AgregarGrupoModalComponent } from './components/agregar-grupo-modal/agregar-grupo-modal.component';

// 👉 Función que llama a init() al iniciar la app
export function initializeFirebase(firebaseInitService: FirebaseInitService) {
  return () => firebaseInitService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    AgregarMacetaFormModalComponent,
    AgregarMacetaModalComponent,
    AgregarGrupoModalComponent,
    // ...otros componentes
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFirebase,
      deps: [FirebaseInitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}