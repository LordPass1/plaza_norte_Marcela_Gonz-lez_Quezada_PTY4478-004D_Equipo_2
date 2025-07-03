import { Injectable } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword, User, signInAnonymously } from 'firebase/auth';
import { FirebaseInitService } from 'src/firebase-init.service';
import { from, Observable } from 'rxjs';
import { Firestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
// Importa AlertController
import { AlertController } from '@ionic/angular';
import { BanModalComponent } from './components/ban-modal/ban-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private unsubscribeBaneo: (() => void) | null = null;
  private auth: Auth;
  private db: Firestore;

  // Inyecta AlertController
  constructor(
    private firebaseInitService: FirebaseInitService,
    private router: Router,
    private alertController: AlertController,
    private modalCtrl: ModalController 
  ) {
    this.auth = firebaseInitService.auth;
    this.db = firebaseInitService.db;

    this.monitorBaneo(); // 🔥 Ejecuta la verificación de baneo en tiempo real
  }

  ngOnDestroy() {
    this.clearBaneoListener();
  }

  // Nuevo método para mostrar alerta con AlertController y esperar confirmación
  private async mostrarAlertaBaneo() {
    const alert = await this.alertController.create({
      header: '🚫 Acceso denegado',
      message: 'Tu cuenta ha sido baneada por incumplir las normas de convivencia.',
      cssClass: 'mi-alerta-baneo',
      buttons: [{ text: 'Aceptar', cssClass: 'mi-boton-aceptar' }],
      backdropDismiss: false
    });

    await alert.present();
    await alert.onDidDismiss();
  }


  private monitorBaneo() {
    this.auth.onAuthStateChanged(async (user) => {
      this.clearBaneoListener();

      if (user) {
        const userDocRef = doc(this.db, 'Personas', user.uid);
        this.unsubscribeBaneo = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data['baneado'] === true) {
              await this.mostrarAlertaBaneo();

              await this.logout();
              this.router.navigate(['/login']);
            }
          }
        });
      }
    });
  }

  private clearBaneoListener() {
    if (this.unsubscribeBaneo) {
      this.unsubscribeBaneo();
      this.unsubscribeBaneo = null;
    }
  }

  get authInstance(): Auth {
    return this.auth;
  }

  async login(email: string, password: string) {
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async loginAnonimo() {
    try {
      const userCredential = await signInAnonymously(this.auth);
      console.log('UID anónimo:', userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      console.error('Error login anónimo', error);
      throw error;
    }
  }

  async isAnonimo(): Promise<boolean> {
    const user = this.auth.currentUser;
    return user ? user.isAnonymous : false;
  }

  getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      const unsubscribe = this.auth.onAuthStateChanged(
        (user) => observer.next(user),
        (error) => observer.error(error),
        () => observer.complete()
      );
      return unsubscribe;
    });
  }

  async obtenerUsuarioActual(): Promise<User | null> {
    return this.auth.currentUser;
  }

  async logout() {
    this.clearBaneoListener();
    await this.auth.signOut();
  }
}


