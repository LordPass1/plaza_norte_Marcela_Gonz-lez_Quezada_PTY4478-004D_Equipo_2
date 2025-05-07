import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-p-principal',
  templateUrl: './p-principal.page.html',
  styleUrls: ['./p-principal.page.scss'],
  standalone: false
})
export class PPrincipalPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
perfil(){
  this.router.navigate(['/perfil-usuario']);
}
}
