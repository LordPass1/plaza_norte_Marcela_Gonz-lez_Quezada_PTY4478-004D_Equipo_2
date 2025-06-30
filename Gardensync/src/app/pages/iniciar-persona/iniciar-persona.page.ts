import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FirebaseService } from 'src/firebase.sevice';
import { LocalNotifications } from '@capacitor/local-notifications';


@Component({
  selector: 'app-iniciar-persona',
  templateUrl: './iniciar-persona.page.html',
  styleUrls: ['./iniciar-persona.page.scss'],
  standalone: false,
})
export class IniciarPersonaPage implements OnInit {

  constructor(private router: Router, private authService: AuthService, private firebaseService: FirebaseService ) { }

  ngOnInit() {
  this.authService.getCurrentUser().subscribe(async (user) => {
    if (user) {
      if (!user.isAnonymous) {
        try {
          const hogar = await this.firebaseService.obtenerHogarUsuario();
          if (hogar) {
            // Si tiene hogar, redirige
            this.router.navigate(['/home/p-principal']);
            return;
          }
        } catch (e) {
          // Si no tiene hogar, puedes dejarlo en la página actual
          console.log('El usuario no tiene hogar:', e);
        }
      } else {

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
}

async probarNotiLocal() {
  await LocalNotifications.requestPermissions();
  await LocalNotifications.createChannel({
    id: 'default',
    name: 'General',
    importance: 5,
    description: 'Canal general'
  });
  await LocalNotifications.schedule({
    notifications: [
      {
        title: 'Prueba',
        body: 'Esto es una notificación local',
        id: Date.now(),
        channelId: 'default'
      },
    ],
  });
  console.log('Notificación programada');
}
}
