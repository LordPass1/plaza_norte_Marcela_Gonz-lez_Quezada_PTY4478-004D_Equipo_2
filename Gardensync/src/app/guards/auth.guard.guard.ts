import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { FirebaseService } from 'src/firebase.sevice';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.getCurrentUser().pipe(
      switchMap(user => {
        if (!user) {
          // No está logueado, enviar a login
          return of(this.router.createUrlTree(['/login']));
        }
        // Si está logueado, verificar si baneado
        return from(this.firebaseService.verificarSiBaneado(user.uid)).pipe(
          map(estaBaneado => {
            if (estaBaneado) {
                Swal.fire({
                  icon: 'error',
                  title: 'Acceso denegado',
                  text: 'Tu cuenta ha sido baneada. No puedes iniciar sesión.',
                  confirmButtonColor: '#d33',
                  confirmButtonText: 'Aceptar'
                });
              this.auth.logout();
              return this.router.createUrlTree(['/login']);
            }
            return true;
          }),
          catchError(() => {
            // En caso de error, enviar a login
            return of(this.router.createUrlTree(['/login']));
          })
        );
      })
    );
  }
}