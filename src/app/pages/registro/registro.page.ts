import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseService } from 'src/firebase.sevice';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit{
  nombreCompleto: string = "";
  //nombre: string = "";
  telefono: string = "";
  correo: string = "";
  contrasena: string = "";
  preguntaseguridad: string = "";
  respuestaseguridad: string = "";

  errorMessage: string = '';

  submitted = false;
  formularioRegistro: FormGroup;
  passwordPattern = '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$';
  correoPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(   
    private firebaseService: FirebaseService, 
    public fb: FormBuilder, 
    private router: Router, 
    private navCtrl: NavController, 
    private alertController: AlertController) { 

      this.formularioRegistro = this.fb.group({
        'nombreUsuario': new FormControl('', [
          Validators.required,                
          Validators.pattern('^[a-z0-9_]{6,}$'), 
          Validators.maxLength(30)                                   
                   
        ]),
        'nombree': new FormControl('', [
          Validators.required,               
          Validators.maxLength(50),
          Validators.minLength(6),
        ]),
        'telefonoo': new FormControl('', [
          Validators.required,               
          Validators.pattern('^[0-9]{9}$')  
        ]),
        'correoo': new FormControl('', [
          Validators.required,
          Validators.pattern(this.correoPattern),               
          Validators.email                   
        ]),
        'contrasenaa': new FormControl('', [
          Validators.required,               
          Validators.pattern(this.passwordPattern)  
        ]),
        'confirmarContrasena': new FormControl('', [
          Validators.required                
        ]),
        'preguntaSeguridadd': new FormControl('', [
          Validators.required
        ]),
        'respuestaSeguridadd': new FormControl('', [
          Validators.required
        ])
      },{ validators: this.confirmarContrasenaValidator}); 
    }
 

  ngOnInit() {
  }

  get nombreUsuario() {
    return this.formularioRegistro.get('nombreUsuario');
  }

  get nombree() {
    return this.formularioRegistro.get('nombree');
  }

  get telefonoo() {
    return this.formularioRegistro.get('telefonoo');
  }

  get correoo() {
    return this.formularioRegistro.get('correoo');
  }

  get contrasenaa() {
    return this.formularioRegistro.get('contrasenaa');
  }

  get confirmarContrasena() {
    return this.formularioRegistro.get('confirmarContrasena');
  }

  get preguntaSeguridadd() {
    return this.formularioRegistro.get('preguntaSeguridadd');
  }

  get respuestaSeguridadd() {
    return this.formularioRegistro.get('respuestaSeguridadd');
  }

  confirmarContrasenaValidator(control: FormGroup) {
    const contrasenaa = control.get('contrasenaa');
    const confirmarContrasena = control.get('confirmarContrasena');

    if (contrasenaa?.value !== confirmarContrasena?.value) {
      confirmarContrasena?.setErrors({ noCoincide: true });
    } else {
      confirmarContrasena?.setErrors(null);
    }

    return null;
  }

  async registrar() {
    this.submitted = true; 
  

    if (this.formularioRegistro.invalid) {
      return;
    }
    
    try {
      const uid = await this.firebaseService.registro(this.nombreCompleto, this.correo, this.contrasena);
      console.log('Usuario registrado con UID:', uid);
      this.router.navigate(['/registro-hogar']);
    } catch (error: any) {
      this.errorMessage = error.message; // Mostrar mensaje de error 
      console.error('Error de registro:', error.message);
    }


  
    this.router.navigate(['/iniciosesion']); 
  }
}