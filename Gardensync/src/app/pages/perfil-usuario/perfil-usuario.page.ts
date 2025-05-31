import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/firebase.sevice';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: false,
})
export class PerfilUsuarioPage implements OnInit {
  constructor(private firebaseService: FirebaseService, private router: Router, private authservice: AuthService ) { }
  hogar: any;
  nombre: string = '';
  correo: string = '';
  ngOnInit() {
    this.cargarDatosPerfil();
    this.cargardaratosHogar();
    this.authservice.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log('Usuario ya logueado', user);
      } else {
        console.log('No hay usuario logueado');
        //this.router.navigate(['/registro']);
      }
    });
  }
  async cargarDatosPerfil() {
    try {
      const datos = await this.firebaseService.obtenerDatosPersona();
      this.nombre = datos['nombreCompleto'];
      this.correo = datos['correo'];
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  }

  async cargardaratosHogar() {
    try {
      const datos = await this.firebaseService.obtenerHogarUsuario();
      this.hogar = datos['nombreHogar'];
      console.log(datos);
    } catch (error) {
      console.error('Error al cargar los datos del hogar:', error);
    }
  }

  async cerrarSesion() {
    try {
      await this.authservice.logout();
      console.log('Sesión cerrada correctamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
