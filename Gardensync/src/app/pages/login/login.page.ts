import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FirebaseService } from 'src/firebase.sevice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,

})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  loginError: boolean = false;           
  loginErrorMessage: string = '';        
  formularioLogin: FormGroup<{ correo: FormControl<string | null>; contrasena: FormControl<string | null>; }>;


  constructor(private authService: AuthService,public fb: FormBuilder, private router: Router,private firebaseService: FirebaseService) {

    this.formularioLogin = this.fb.group({
      'correo': new FormControl("", [Validators.required, Validators.email]),
      'contrasena': new FormControl("", [Validators.required])
    });
  }

  iniciar(){

    this.router.navigate(['/home/p-principal']);

  }

  get correo() {
    return this.formularioLogin.get('correo');
  }

  get contrasena() {
    return this.formularioLogin.get('contrasena');
  }

ngOnInit() {
  this.authService.getCurrentUser().subscribe(async (user) => {
    if (user) {
      const userDoc = await this.firebaseService.obtenerUsuarioPorUid(user.uid);
      
      // ✅ Solo redirige si NO está baneado
      if (userDoc && userDoc.baneado !== true && !user.isAnonymous) {
        console.log('Usuario válido, redirigiendo a home');
        this.router.navigate(['/home/p-principal'], { replaceUrl: true });
      } else if (userDoc && userDoc.baneado === true) {
        console.log('Usuario baneado detectado en login, no redirigir');
        // Nada, no navegar
      }
    } else {
      console.log('No hay usuario logueado');
    }
  });
}


async onLogin() {
  if (!this.email || !this.password) {
    alert('Por favor, ingresa un correo y una contraseña.');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    alert('El correo es inválido.');
    return;
  }

  this.isLoading = true;

  try {
    const userCredential = await this.authService.login(this.email, this.password);

    if (userCredential && userCredential.user) {
      const uid = userCredential.user.uid;

      // Aquí preguntas si el usuario está baneado
      const estaBaneado = await this.firebaseService.verificarSiBaneado(uid);

      if (estaBaneado) {
        // Mostrar alerta o manejar el ban de forma adecuada
        //alert('Tu cuenta ha sido baneada y no puedes acceder.');
        
        await this.authService.logout();
        this.router.navigate(['/login'], { replaceUrl: true });
        return; // Importante: salir para que no navegue al home
      }

      console.log('Usuario logueado:', userCredential.user);
      this.router.navigate(['/home/p-principal'], { replaceUrl: true });

    } else {
      throw new Error('No se pudo autenticar el usuario.');
    }
  } catch (error: any) {
    this.handleLoginError(error);
  } finally {
    this.isLoading = false;
  }
}



    handleLoginError(error: any) {
    switch (error.code) {
      case 'auth/user-not-found':
        alert('El usuario no existe.');
        break;
      case 'auth/wrong-password':
        alert('Contraseña incorrecta.');
        break;
      case 'auth/invalid-email':
        alert('Correo inválido.');
        break;
      case 'auth/invalid-credential':
      alert('El correo o la contraseña son inválidos.');
        break;

      default:
        alert('Error de login. Intenta nuevamente.');
        console.error(error);
        break;
    }
  }
  async loginInvitado() {
    try {
      const user = await this.authService.loginAnonimo();
      this.router.navigate(['/registro-hogar']);
    } catch (error) {
      console.error('Error en login invitado:', error);
    }
  }



}
