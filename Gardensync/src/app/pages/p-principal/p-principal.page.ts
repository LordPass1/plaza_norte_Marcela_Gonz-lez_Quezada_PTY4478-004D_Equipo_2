import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/firebase.sevice';
import { ModalController, Platform } from '@ionic/angular';
import { AgregarGrupoModalComponent } from 'src/app/components/agregar-grupo-modal/agregar-grupo-modal.component';
import { AgregarMacetaModalComponent } from 'src/app/components/agregar-maceta-modal/agregar-maceta-modal.component';

@Component({
  selector: 'app-p-principal',
  templateUrl: './p-principal.page.html',
  styleUrls: ['./p-principal.page.scss'],
  standalone: false
})
export class PPrincipalPage implements OnInit, OnDestroy {
  grupos: any[] = [];
  cargando = true;
  private backButtonSub: any;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private modalCtrl: ModalController,
    private platform: Platform
  ) { }

  async ngOnInit() {
    await this.cargarGrupos();
    // Bloquear botón atrás físico
    this.backButtonSub = this.platform.backButton.subscribeWithPriority(Infinity, () => {
      console.log('Botón atrás bloqueado en p-principal');
    });
  }

  ngOnDestroy() {
    if (this.backButtonSub) {
      this.backButtonSub.unsubscribe();
    }
  }

  async cargarGrupos() {
    this.cargando = true;
    this.grupos = await this.firebaseService.obtenerGruposYMacetas();
    this.cargando = false;
  }

  async abrirAgregarGrupo() {
    const modal = await this.modalCtrl.create({
      component: AgregarGrupoModalComponent,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then(() => this.cargarGrupos());
    await modal.present();
  }

  async abrirModalMacetas(grupo: any) {
    const modal = await this.modalCtrl.create({
      component: AgregarMacetaModalComponent,
      componentProps: { idGrupo: grupo.id },
      cssClass: 'custom-modal'
    });
    await modal.present();
  }

  perfil() {
    this.router.navigate(['/perfil-usuario']);
  }
}


