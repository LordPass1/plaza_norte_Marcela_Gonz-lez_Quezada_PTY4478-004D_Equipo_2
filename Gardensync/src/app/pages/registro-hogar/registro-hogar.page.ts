import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { FirebaseService } from 'src/firebase.sevice';

@Component({
  selector: 'app-registro-hogar',
  templateUrl: './registro-hogar.page.html',
  styleUrls: ['./registro-hogar.page.scss'],
  standalone: false,
})
export class RegistroHogarPage implements OnInit {
  nombreHogar: string = '';

  constructor( private firebaseservice: FirebaseService, private router: Router) { }

  ngOnInit() {
  }
  
  async registrarHogar() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error('Usuario no autenticado');
      }
  
      const uid = user.uid;
      const hogarId = await this.firebaseservice.addHogar(uid, this.nombreHogar);
      console.log('Hogar registrado con ID:', hogarId);
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error de registro:', error.message);
    }
  }

}
