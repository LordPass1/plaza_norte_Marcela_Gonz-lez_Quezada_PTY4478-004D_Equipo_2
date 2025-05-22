import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
  standalone: false,
})
export class EditarperfilPage implements OnInit {
  nombreUsuario: string = ""; 
  correo: string = "";
  hogar: string = "";
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
    



    

    this.router.navigate(['/perfil-usuario']);
  }

}
