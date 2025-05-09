import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  nombreUsuario: string = ""; 
  correo: string = "";
  telefono: string = "";
  nombreUsuarioTouched: boolean = false; 
  nombreUsuarioValido: boolean = true;  
  nombreUsuarioErrores: any = {}; 
  constructor(private router: Router) { }

  ngOnInit() {
  }


  validarNombreUsuario() {
    this.nombreUsuarioTouched = true; 

    const regexPattern = /^[a-z0-9_]{6,30}$/; 

    this.nombreUsuarioErrores = {};  

    if (!this.nombreUsuario) {
      this.nombreUsuarioValido = false;
      this.nombreUsuarioErrores.required = true;
    } else if (!regexPattern.test(this.nombreUsuario)) {
      this.nombreUsuarioValido = false;
      this.nombreUsuarioErrores.pattern = true;
    } else if (this.nombreUsuario.length > 30) {
      this.nombreUsuarioValido = false;
      this.nombreUsuarioErrores.maxlength = true;
    } else {
      this.nombreUsuarioValido = true;  
    }
  }

  guardarPerfil() {
    this.validarNombreUsuario();
    



    
    // Redirigir a la página del perfil
    this.router.navigate(['/perfil']);
  }

}
