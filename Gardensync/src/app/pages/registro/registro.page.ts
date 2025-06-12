import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { FirebaseService } from 'src/firebase.sevice';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit {

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
    private alertController: AlertController,
    private authService: AuthService) {

    this.formularioRegistro = this.fb.group({
      'nombree': new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(6),
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
      ])
    }, { validators: this.confirmarContrasenaValidator });
  }


  ngOnInit() {
  this.authService.getCurrentUser().subscribe((user) => {
    if (user) {
      if (!user.isAnonymous) {
        console.log('Usuario con cuenta, redirigiendo a home:', user);
        this.router.navigate(['/home']);
      } else {
        console.log('Usuario anónimo, puede registrarse o iniciar sesión');
      }
    } else {
      console.log('No hay usuario logueado');
    }
  });

  }


  get nombree() {
    return this.formularioRegistro.get('nombree');
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
  console.log('registrar llamado');
  this.submitted = true;

  if (this.formularioRegistro.invalid) {
    return;
  }

  try {
    const { nombree, correoo, contrasenaa } = this.formularioRegistro.value;
    // Llamamos a registro() que hace la vinculación si hay sesión anónima
    const uid = await this.firebaseService.registro(nombree, correoo, contrasenaa);
    console.log('Usuario registrado con UID:', uid);

    // Aquí navegas solo después del registro correcto
    this.router.navigate(['/registro-hogar']);
  } catch (error: any) {
    this.errorMessage = error.message; // Mostrar mensaje de error
    console.error('Error de registro:', error.message);
  }
}
}