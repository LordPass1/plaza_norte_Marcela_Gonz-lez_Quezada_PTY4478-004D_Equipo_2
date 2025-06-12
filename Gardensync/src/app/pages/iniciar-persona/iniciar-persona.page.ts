import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-iniciar-persona',
  templateUrl: './iniciar-persona.page.html',
  styleUrls: ['./iniciar-persona.page.scss'],
  standalone: false,
})
export class IniciarPersonaPage implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
      this.authService.getCurrentUser().subscribe((user) => {
    if (user) {
      if (!user.isAnonymous) {
        console.log('Usuario con cuenta, redirigiendo a home:', user);
        this.router.navigate(['/home']);
      } else {
        console.log('Usuario anónimo, puede registrarse o iniciar sesión');
        // No redirigimos, queda en registro/login
      }
    } else {
      console.log('No hay usuario logueado');
    }
  });
  }
  

async irAregistro(){
  this.router.navigate(['registro']);
}
async irAlogin(){
  this.router.navigate(['login']);
}
async loginInvitado() {
  try {
    const user = await this.authService.loginAnonimo();
    this.router.navigate(['/registro-hogar']);
  } catch (error) {
    console.error('Error en login invitado:', error);
  }
}

onVideoEnded() {
  const video = document.getElementById('bgVideo') as HTMLVideoElement;
  if (video) {
    video.pause();
    video.currentTime = video.duration; 

}
}}
