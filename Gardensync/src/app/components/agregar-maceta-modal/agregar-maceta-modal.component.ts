import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/firebase.sevice';
import { getAuth } from 'firebase/auth';
import { AgregarMacetaFormModalComponent } from 'src/app/components/agregar-maceta-form-modal/agregar-maceta-form-modal.component'; // importa tu modal de formulario
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-maceta-modal',
  templateUrl: './agregar-maceta-modal.component.html',
  styleUrls: ['./agregar-maceta-modal.component.scss'],
  standalone: false,
})
export class AgregarMacetaModalComponent implements OnInit {
  @Input() idGrupo!: string;
  macetas: any[] = [];
  cargando = true;
  idPersona = '';
  idHogar = '';

  constructor(
    private modalCtrl: ModalController,
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;
    this.idPersona = user.uid;

    // Obtener el hogar del usuario (asumiendo uno solo)
    const hogaresRef = await this.firebaseService.obtenerHogarUsuario();
    this.idHogar = hogaresRef['id'];

    this.macetas = await this.firebaseService.obtenerMacetasDeGrupo(
      this.idPersona,
      this.idHogar,
      this.idGrupo
    );
    this.cargando = false;
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
 async cargarMacetas() {
    this.cargando = true;
    this.macetas = await this.firebaseService.obtenerMacetasDeGrupo(
      this.idPersona,
      this.idHogar,
      this.idGrupo
    );
    this.cargando = false;
  }
  
  async abrirAgregarMaceta() {
    const modal = await this.modalCtrl.create({
      component: AgregarMacetaFormModalComponent,
      componentProps: {
        idPersona: this.idPersona,
        idHogar: this.idHogar,
        idGrupo: this.idGrupo
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      await this.cargarMacetas();
    }
  }
  }
