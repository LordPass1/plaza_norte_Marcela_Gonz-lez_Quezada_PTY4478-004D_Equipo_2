import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.page.html',
  styleUrls: ['./cambiarclave.page.scss'],
  standalone: false
})
export class CambiarclavePage implements OnInit {

  formularioCambioContrasena: FormGroup;
  submitted = false;

  passwordPattern: string = '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$';

  constructor(
    private router: Router, 
    private alertController: AlertController,
    private menuCtrl: MenuController
  ) {
    
    this.formularioCambioContrasena = new FormGroup({
      'contrasenaActual': new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordPattern),
        Validators.minLength(8),
      ]),
      'nuevaContrasena': new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordPattern), 
      ]),
      'confirmarNuevaContrasena': new FormControl('', [
        Validators.required
      ])
    }, [this.confirmarContrasenaValidator]); 
  }

  ngOnInit() {}

  
  get contrasenaActual() {
    return this.formularioCambioContrasena.get('contrasenaActual');
  }

  get nuevaContrasena() {
    return this.formularioCambioContrasena.get('nuevaContrasena');
  }

  get confirmarNuevaContrasena() {
    return this.formularioCambioContrasena.get('confirmarNuevaContrasena');
  }

 
  confirmarContrasenaValidator: ValidatorFn = (control: AbstractControl) => {
    const nuevaContrasena = control.get('nuevaContrasena');
    const confirmarNuevaContrasena = control.get('confirmarNuevaContrasena');

    if (nuevaContrasena && confirmarNuevaContrasena) {
      if (nuevaContrasena.value !== confirmarNuevaContrasena.value) {
        confirmarNuevaContrasena.setErrors({ noCoincide: true });
      } else {
        confirmarNuevaContrasena.setErrors(null); 
      }
    }

    return null;
  };

  onBackClick() {
    this.menuCtrl.open();

    setTimeout(() => {
      this.router.navigate(['/home/p-principal']);
    }, );  
  }


  async cambiarContrasena() {
    this.submitted = true;

    if (this.formularioCambioContrasena.invalid) {
      return;
    }
  
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const contrasenaActual = this.formularioCambioContrasena.get('contrasenaActual')?.value;
    const nuevaContrasena = this.formularioCambioContrasena.get('nuevaContrasena')?.value;
  

    if (usuario.contrasena === contrasenaActual) {

      usuario.contrasena = nuevaContrasena;

      localStorage.setItem('usuario', JSON.stringify(usuario));
  
      const alert = await this.alertController.create({
        header: 'Contraseña Actualizada',
        message: 'Tu contraseña ha sido actualizada exitosamente.',
        buttons: ['OK']
      });
  
      await alert.present();

      this.router.navigate(['/main']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La contraseña actual no es correcta.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
