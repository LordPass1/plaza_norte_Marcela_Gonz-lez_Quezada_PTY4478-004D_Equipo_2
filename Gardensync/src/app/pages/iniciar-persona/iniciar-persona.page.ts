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
        console.log('Usuario ya logueado', user);
        this.router.navigate(['/home/p-principal']);	
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
async anonimo(){
  this.router.navigate(['home']);
}

onVideoEnded() {
  const video = document.getElementById('bgVideo') as HTMLVideoElement;
  if (video) {
    video.pause();
    video.currentTime = video.duration; 

}
}}
