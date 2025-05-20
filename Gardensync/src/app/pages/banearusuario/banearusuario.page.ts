import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-banearusuario',
  templateUrl: './banearusuario.page.html',
  styleUrls: ['./banearusuario.page.scss'],
  standalone: false
})
export class BanearusuarioPage implements OnInit {

  banForm = this.formBuilder.group({
    nombre_usuario_ban: ['', [Validators.required, Validators.maxLength(20)]],
    tiempo_ban: ['', Validators.required],
    razon_ban: ['', Validators.required]
  });

  constructor(private alertController: AlertController,private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  async submitBan() {
    if (this.banForm.valid) {
      const banData = this.banForm.value; 
      console.log('Datos del Baneo:', banData);

      const alert = await this.alertController.create({
        header: 'Usuario Baneado',
        message: `El usuario ${banData.nombre_usuario_ban} ha sido baneado con éxito.`,
        buttons: ['OK']
      });

      await alert.present();

      this.banForm.reset();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos correctamente.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

}
