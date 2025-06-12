import { Injectable } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword, User, signInAnonymously } from 'firebase/auth';  // Importar User y otros métodos
import { FirebaseInitService } from 'src/firebase-init.service';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;

  constructor(private firebaseInitService: FirebaseInitService) {
    // Usamos la instancia de auth ya inicializada
    this.auth = firebaseInitService.auth;
  }

  // Método para realizar login con email y contraseña
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
  
  // Método para obtener el usuario actual
  getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      const unsubscribe = this.auth.onAuthStateChanged(
        (user) => {
          observer.next(user);  // Emitir el usuario
        },
        (error) => {
          observer.error(error);  // Emitir el error
        },
        () => {
          observer.complete();  // Completar cuando termine
        }
      );

      // Limpiar la suscripción cuando se desuscriba el observable
      return unsubscribe;
    });
  }

  // Método para cerrar sesión
  logout() {
    this.auth.signOut();
  }
}
