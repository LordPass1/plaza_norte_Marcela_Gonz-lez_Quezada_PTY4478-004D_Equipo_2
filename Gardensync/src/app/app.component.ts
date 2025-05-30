import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
<<<<<<< HEAD
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
    this.router.navigate(['/iniciosesion']);
  }

  cerrarMenuYNavegarACambiarContra() {
    this.menuCtrl.close();
    this.router.navigate(['/cambiarclave']);
  }
=======
  constructor() {}
>>>>>>> parent of 834ec35 (componente para el botón de menu)
}
