import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/firebase.sevice';
import { getAuth } from 'firebase/auth';
import { AgregarMacetaFormModalComponent } from 'src/app/components/agregar-maceta-form-modal/agregar-maceta-form-modal.component';
import { Maceta } from 'src/firebase.sevice'; // Asegúrate de importar el tipo
import { getDatabase, ref, onValue, off } from 'firebase/database';

@Component({
  selector: 'app-agregar-maceta-modal',
  templateUrl: './agregar-maceta-modal.component.html',
  styleUrls: ['./agregar-maceta-modal.component.scss'],
  standalone: false,
})
export class AgregarMacetaModalComponent implements OnInit, OnDestroy {
  @Input() idGrupo!: string;
  macetas: Maceta[] = []; // 👈 Usa el tipo aquí
  cargando = true;
  idPersona = '';
  idHogar = '';
  private sensorListeners: { [sensorId: string]: any } = {};

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

    // Solo detectar estado crítico si hay macetas
    if (this.macetas.length > 0) {
      this.macetas.forEach(maceta => {
        if (maceta.sensorId) {
          this.firebaseService.detectarEstadoCritico(maceta.sensorId);
        }
      });
    }
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
    this.macetas = macetasFirestore;

    // Limpia listeners anteriores
    Object.values(this.sensorListeners).forEach(unsub => unsub && unsub());
    this.sensorListeners = {};

    const db = getDatabase();

    this.macetas.forEach((maceta, idx) => {
      if (maceta.sensorId && maceta.sensorId.toUpperCase() === 'SIMULADOR') {
        // SIMULADOR: genera datos random cada 5 segundos
        const interval = setInterval(() => {
          const temperatura = Math.floor(Math.random() * 20) + 10; // 10-30°C
          const humedad = Math.floor(Math.random() * 60) + 20;     // 20-80%
          const nivelAgua = Math.floor(Math.random() * 100);       // 0-100%
          this.macetas[idx] = {
            ...maceta,
            temperatura,
            humedad,
            nivelAgua,
            estado: 'Actualizado'
          };
          // Llama a la función de notificaciones simuladas
          this.firebaseService.simularNotificaciones({
            temperatura,
            humedad,
            nivelAgua,
            sensorId: maceta.sensorId
          });
        }, 5000); // Cambia cada 5 segundos

        this.sensorListeners[maceta.sensorId] = () => clearInterval(interval);
      } else if (maceta.sensorId) {
        // Sensor real: escucha Firebase
        const sensorRef = ref(db, `sensores/${maceta.sensorId}`);
        const listener = onValue(sensorRef, (snapshot) => {
          if (snapshot.exists()) {
            const datosSensor = snapshot.val();
            this.macetas[idx] = {
              ...maceta,
              temperatura: datosSensor.temperature_c ?? maceta.temperatura,
              humedad: datosSensor.air_humidity ?? maceta.humedad,
              nivelAgua: datosSensor.soil_humidity_pct ?? maceta.nivelAgua,
              estado: 'Actualizado'
            };
          } else {
            this.macetas[idx] = {
              ...maceta,
              estado: 'Sin conexión'
            };
          }
        });
        this.sensorListeners[maceta.sensorId] = () => off(sensorRef, 'value', listener);
      }
    });

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

  ngOnDestroy() {
    // Limpia los listeners al cerrar el modal
    Object.values(this.sensorListeners).forEach(unsub => unsub && unsub());
  }
}
