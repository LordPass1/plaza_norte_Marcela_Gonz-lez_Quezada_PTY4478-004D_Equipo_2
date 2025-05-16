import { Injectable } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';  // Importar User y otros métodos
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
