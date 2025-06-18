import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/firebase.sevice';
import { GPTService } from 'src/app/services/gpt.service';

@Component({
  selector: 'app-agregar-maceta-form-modal',
  templateUrl: './agregar-maceta-form-modal.component.html',
  styleUrls: ['./agregar-maceta-form-modal.component.scss'],
  standalone: false,
})
export class AgregarMacetaFormModalComponent implements OnInit {
  @Input() idGrupo!: string;
  @Input() idPersona!: string;
  @Input() idHogar!: string;

  macetaForm: FormGroup;
  consejosIA: string | null = null;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private gptService: GPTService
  ) {
    this.macetaForm = this.fb.group({
      nombrePlanta: ['', Validators.required],
      temperatura: [{ value: 0, disabled: true }],
      humedad: [{ value: 0, disabled: true }],
      nivelAgua: [{ value: 0, disabled: true }],
      estado: [{ value: '', disabled: true }],
      sensorId: ['192_168_100_254', Validators.required] // 
    });
  }

  ngOnInit() {
    this.macetaForm.get('nombrePlanta')?.valueChanges.subscribe(val => {
      if (val && val.trim().length > 2 && val !== 'Desconocida') {
        this.obtenerConsejosPorNombre(val.trim());
      } else {
        this.consejosIA = null;
      }
    });

    // Escuchar datos en tiempo real desde Firebase Realtime Database
    this.obtenerDatosSensorRealtime();
  }

  async obtenerDatosSensorRealtime() {
    const sensorId = '192_168_100_254'; // Cambia esto por el ID del sensor correspondiente

    try {
      const datosSensor = await this.firebaseService.obtenerDatosSensorRealtime(sensorId);

      // Actualiza el formulario con los datos del sensor
      this.macetaForm.patchValue({
        temperatura: datosSensor.temperature_c || 0,
        humedad: datosSensor.air_humidity || 0,
        nivelAgua: datosSensor.soil_humidity_pct || 0,
        estado: 'Actualizado'
      });
    } catch (error) {
      console.error(`Error al obtener datos del sensor ${sensorId}:`, error);

      // Si no hay conexión, muestra valores en 0
      this.macetaForm.patchValue({
        temperatura: 0,
        humedad: 0,
        nivelAgua: 0,
        estado: 'Sin conexión'
      });
    }
  }

  async usarIA() {
    this.consejosIA = 'Identificando planta...';
    const base64 = await this.gptService.takePicture();
    if (!base64) {
      this.consejosIA = 'No se seleccionó ninguna imagen.';
      this.macetaForm.patchValue({ nombrePlanta: 'Desconocida' });
      return;
    }
    this.gptService.chatConGPT(base64).subscribe({
      next: (data) => {
        try {
          let responseText = data.choices[0].message.content.trim();
          const match = responseText.match(/{[\s\S]*}/);
          if (match) responseText = match[0];
          const info = JSON.parse(responseText);

          // Si no hay nombre, poner "Desconocida"
          const nombre = info.common_name || 'Desconocida';
          this.macetaForm.patchValue({ nombrePlanta: nombre });

          // Consejos IA
          this.consejosIA = `
            <b>Especie:</b> ${info.scientific_name?.[0] || 'Desconocida'}<br>
            <b>Familia:</b> ${info.family || 'Desconocida'}<br>
            <b>Riego:</b> ${info.watering || 'No disponible'}<br>
            <b>Consejo:</b> ${info.description || 'No disponible'}
          `;
        } catch {
          this.macetaForm.patchValue({ nombrePlanta: 'Desconocida' });
          this.consejosIA = 'No se pudo identificar la planta.';
        }
      },
      error: () => {
        this.macetaForm.patchValue({ nombrePlanta: 'Desconocida' });
        this.consejosIA = 'Error al consultar la IA.';
      }
    });
  }

  // Nuevo método para obtener consejos por nombre
  obtenerConsejosPorNombre(nombre: string) {
    this.consejosIA = 'Buscando consejos...';
    this.gptService.obtenerConsejosPorNombre(nombre).subscribe({
      next: (data) => {
        try {
          let responseText = data.choices[0].message.content.trim();
          const match = responseText.match(/{[\s\S]*}/);
          if (match) responseText = match[0];
          const info = JSON.parse(responseText);

          this.consejosIA = `
            <b>Especie:</b> ${info.scientific_name?.[0] || 'Desconocida'}<br>
            <b>Familia:</b> ${info.family || 'Desconocida'}<br>
            <b>Riego:</b> ${info.watering || 'No disponible'}<br>
            <b>Consejo:</b> ${info.description || 'No disponible'}
          `;
        } catch {
          this.consejosIA = 'No se encontraron consejos para esta planta.';
        }
      },
      error: () => {
        this.consejosIA = 'Error al consultar la IA.';
      }
    });
  }

  async guardarMaceta() {



    const { nombrePlanta, temperatura, humedad, nivelAgua, estado } = this.macetaForm.getRawValue();

    // Asegúrate de incluir el sensorId aquí
    const sensorId = '192_168_100_254'; // 👈 Cambia esto por el ID del sensor correspondiente

    await this.firebaseService.addMaceta(
      this.idPersona,
      this.idHogar,
      this.idGrupo,
      nombrePlanta,
      temperatura,
      humedad,
      nivelAgua,
      estado,
      sensorId //  Incluye el sensorId
    );

    this.modalCtrl.dismiss(true);
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
