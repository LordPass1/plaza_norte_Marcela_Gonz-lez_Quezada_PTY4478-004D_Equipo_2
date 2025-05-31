import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

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


  constructor(private authService: AuthService,public fb: FormBuilder, private router: Router,) {

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
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log('Usuario ya logueado', user);
        this.router.navigate(['/home']);
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
      alert('el correo es inválido.');
      return;
    }
  
    this.isLoading = true; 
  
    try {
      const user = await this.authService.login(this.email, this.password);
  
      if (user && user.user) {
        console.log('Usuario logueado:', user.user);
        this.router.navigate(['/home']);
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
}
