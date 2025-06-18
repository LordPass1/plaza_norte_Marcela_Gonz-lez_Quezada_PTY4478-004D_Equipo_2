import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/firebase.sevice';
import { getAuth } from 'firebase/auth';
import { AgregarMacetaFormModalComponent } from 'src/app/components/agregar-maceta-form-modal/agregar-maceta-form-modal.component';
import { Maceta } from 'src/firebase.sevice'; // Asegúrate de importar el tipo

@Component({
  selector: 'app-agregar-maceta-modal',
  templateUrl: './agregar-maceta-modal.component.html',
  styleUrls: ['./agregar-maceta-modal.component.scss'],
  standalone: false,
})
export class AgregarMacetaModalComponent implements OnInit {
  @Input() idGrupo!: string;
  macetas: Maceta[] = []; // 👈 Usa el tipo aquí
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
    this.idHogar = hogaresRef.id;

    await this.cargarMacetas();

    const sensorId = '192_168_100_254'; // Cambia esto por el ID del sensor correspondiente
    this.firebaseService.detectarEstadoCritico(sensorId);
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async cargarMacetas() {
    this.cargando = true;

    const macetasFirestore = await this.firebaseService.obtenerMacetasDeGrupo(
      this.idPersona,
      this.idHogar,
      this.idGrupo
    );

    this.macetas = await Promise.all(
      macetasFirestore.map(async (maceta) => {
        try {
          const datosSensor = await this.firebaseService.obtenerDatosSensorRealtime(maceta.sensorId);
          return {
            ...maceta,
            temperatura: datosSensor.temperature_c || maceta.temperatura,
            humedad: datosSensor.air_humidity || maceta.humedad,
            nivelAgua: datosSensor.soil_humidity_pct || maceta.nivelAgua,
            estado: 'Actualizado',
          };
        } catch (error) {
          console.error(`Error al obtener datos del sensor ${maceta.sensorId}:`, error);
          return {
            ...maceta,
            estado: 'Sin conexión',
          };
        }
      })
    );

    this.cargando = false;
  }

  async abrirAgregarMaceta() {
    const modal = await this.modalCtrl.create({
      component: AgregarMacetaFormModalComponent,
      componentProps: {
        idPersona: this.idPersona,
        idHogar: this.idHogar,
        idGrupo: this.idGrupo,
      },
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      await this.cargarMacetas();
    }
  }
}
