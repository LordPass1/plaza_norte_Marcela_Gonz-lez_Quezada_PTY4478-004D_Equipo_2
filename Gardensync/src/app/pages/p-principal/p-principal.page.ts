import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/firebase.sevice';
import { ModalController } from '@ionic/angular';
import { AgregarGrupoModalComponent } from 'src/app/components/agregar-grupo-modal/agregar-grupo-modal.component';
import { AgregarMacetaModalComponent } from 'src/app/components/agregar-maceta-modal/agregar-maceta-modal.component';

@Component({
  selector: 'app-p-principal',
  templateUrl: './p-principal.page.html',
  styleUrls: ['./p-principal.page.scss'],
  standalone: false
})
export class PPrincipalPage implements OnInit {
  grupos: any[] = [];
  cargando = true;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    await this.cargarGrupos();
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


