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
  hogar: { id: string; nombreHogar?: string } | null = null;
  nombre: string = '';
  correo: string = '';
  esAnonimo = false;

  // Para edición
  editMode = false;
  editNombre = '';
  editCorreo = '';
  guardando = false;
  editNombreHogar = '';

  constructor(private firebaseService: FirebaseService, private router: Router, private authservice: AuthService ) { }

  async ngOnInit() {
    this.cargarDatosPerfil();
    this.cargardaratosHogar();
    this.authservice.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log('Usuario ya logueado', user);
      } else {
        console.log('No hay usuario logueado');
        this.router.navigate(['/registro']);
      }
    });
    this.esAnonimo = await this.authservice.isAnonimo();
  }

  async cargarDatosPerfil() {
    try {
      const datos = await this.firebaseService.obtenerDatosPersona();
      this.nombre = datos['nombreCompleto'];
      this.correo = datos['correo'];
      // Prepara los valores para edición
      this.editNombre = this.nombre;
      this.editCorreo = this.correo;
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  }

  async cargardaratosHogar() {
    try {
      const datos = await this.firebaseService.obtenerHogarUsuario();
      this.hogar = datos;
      this.editNombreHogar = (datos && 'nombreHogar' in datos) ? (datos as any).nombreHogar : '';
      console.log(datos);
    } catch (error) {
      console.error('Error al cargar los datos del hogar:', error);
    }
  }

  async cerrarSesion() {
    try {
      this.authservice.logout();
      console.log('Sesión cerrada correctamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  activarEdicion() {
    this.editMode = true;
    this.editNombre = this.nombre;
    this.editCorreo = this.correo;
  }

  cancelarEdicion() {
    this.editMode = false;
  }

  async guardarEdicion() {
    this.guardando = true;
    try {
      await this.firebaseService.actualizarPerfilUsuario(this.editNombre, this.editCorreo);
      if (this.editNombreHogar) {
        await this.firebaseService.actualizarNombreHogar(this.editNombreHogar);
        this.hogar = { id: this.hogar?.id || '', nombreHogar: this.editNombreHogar };
      }
      this.nombre = this.editNombre;
      this.correo = this.editCorreo;
      this.editMode = false;
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
    this.guardando = false;
  }
}
