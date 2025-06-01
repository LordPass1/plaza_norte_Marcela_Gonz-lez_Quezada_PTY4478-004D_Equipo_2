import { Component } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from 'src/firebase.sevice';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-agregar-grupo-modal',
  templateUrl: './agregar-grupo-modal.component.html',
  styleUrls: ['./agregar-grupo-modal.component.scss'],
  standalone: false,
})
export class AgregarGrupoModalComponent {
  grupoForm: FormGroup;
  cargando = false;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.grupoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  async guardar() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (this.grupoForm.invalid) return;
    this.cargando = true;

    try {
      if (!user) throw new Error('Usuario no autenticado');
      await this.firebaseService.addGrupoToUserHogar(user.uid, this.grupoForm.value.nombre);

      this.cargando = false;
      this.modalCtrl.dismiss();
    } catch (error) {
      this.cargando = false;
      console.error(error);
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
