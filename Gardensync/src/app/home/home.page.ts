import { Component, OnDestroy } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnDestroy {
  private backButtonSub: any;

  constructor(
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private authservice: AuthService
  ) {
    this.backButtonSub = this.platform.backButton.subscribeWithPriority(9999, () => {
      // No hacer nada, así se bloquea el botón atrás en Home
    });
  }

  ngOnDestroy() {
    if (this.backButtonSub) {
      this.backButtonSub.unsubscribe();
    }
  }

  async abrirMenu() {
    const auth = getAuth();
    const user = auth.currentUser;

    const buttons: any[] = [
      {
        text: 'Mi perfil',
        icon: 'person-circle-outline',
        cssClass: 'action-btn',
        handler: async () => {
          const topSheet = await this.actionSheetCtrl.getTop();
          if (topSheet) await topSheet.dismiss();
          this.router.navigate(['/perfil-usuario']);
        }
      },
      {
        text: 'Tutorial',
        icon: 'help-circle-outline',
        cssClass: 'tutorial-btn action-btn',
        handler: () => {
          this.router.navigate(['/tutorial']);
        }
      },
      {
        text: 'Cerrar sesión',
        icon: 'log-out-outline',
        cssClass: 'logout-btn action-btn',
        handler: () => {
          this.authservice.logout();
          this.router.navigate(['/iniciar-persona'], { replaceUrl: true });
        }
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        cssClass: 'cancel-btn action-btn',
        role: 'cancel'
      }
    ];

    // Si el usuario no está logueado, oculta "Mi perfil" y "Cerrar sesión"
    if (!user || user.isAnonymous) {
      buttons.splice(0, 1); // Quita "Mi perfil"
      buttons.splice(1, 1); // Quita "Cerrar sesión" (ahora está en la posición 1)
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Menú',
      buttons,
      cssClass: 'my-action-sheet'
    });
    await actionSheet.present();
  }
}
