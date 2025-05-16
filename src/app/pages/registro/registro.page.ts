import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/firebase.sevice';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit{
  nombreCompleto: string = '';
  correo: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router) {}
  ngOnInit(): void {
  }

  async registrar() {
    try {
      const uid = await this.firebaseService.registro(this.nombreCompleto, this.correo, this.contrasena);
      console.log('Usuario registrado con UID:', uid);
      this.router.navigate(['/registro-hogar']);
    } catch (error: any) {
      this.errorMessage = error.message; // Mostrar mensaje de error 
      console.error('Error de registro:', error.message);
    }
  }
}