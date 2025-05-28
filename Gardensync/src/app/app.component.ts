import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private alertController: AlertController, 
    private router: Router, 
    private menuCtrl: MenuController 
  ) {}


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.cerrarSesion();
          }
        }
      ],
      cssClass: 'custom-alert'
    });
  
    await alert.present();
  }

  cerrarSesion() {
    this.menuCtrl.close();
    this.router.navigate(['/login']);
  }

  cerrarMenuYNavegarACambiarContra() {
    this.menuCtrl.close();
    this.router.navigate(['/home/cambiarclave']);
  }
}
