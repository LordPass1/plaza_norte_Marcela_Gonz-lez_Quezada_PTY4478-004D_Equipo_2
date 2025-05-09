import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-verificarcorreo',
  templateUrl: './verificarcorreo.page.html',
  styleUrls: ['./verificarcorreo.page.scss'],
  standalone: false
})
export class VerificarcorreoPage implements OnInit {
  formularioVerificarCorreo: FormGroup;
  submitted = false;
  loginError: boolean = false;
  loginErrorMessage: string = '';
  constructor(    
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController) { 
      this.formularioVerificarCorreo = this.fb.group({
        correo: ['', [Validators.required, Validators.email]],
      });
    }

  ngOnInit() {
  }

  get correo() {
    return this.formularioVerificarCorreo.get('correo');
  }

  async verificarCorreo() {
    this.submitted = true;

    if (this.formularioVerificarCorreo.invalid) {
      return;
    }

    const correoIngresado = this.formularioVerificarCorreo.value.correo;
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (usuario.correo === correoIngresado) {
      this.router.navigate(['/recuperarcontra']);
    } else {
      this.loginError = true;
      this.loginErrorMessage = 'El correo no está registrado o es incorrecto.';

    }
  }
}
