import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

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
    try {
      const user = await this.authService.login(this.email, this.password);
      console.log('Usuario logueado:', user);
      this.router.navigate(['/home']);
    } catch (error) {
      alert('Error de login. Verifica tu correo o contraseña.');
    }
  }
}
