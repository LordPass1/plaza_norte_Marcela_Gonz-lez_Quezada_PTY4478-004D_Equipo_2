import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-persona',
  templateUrl: './iniciar-persona.page.html',
  styleUrls: ['./iniciar-persona.page.scss'],
  standalone: false,
})
export class IniciarPersonaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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
}
