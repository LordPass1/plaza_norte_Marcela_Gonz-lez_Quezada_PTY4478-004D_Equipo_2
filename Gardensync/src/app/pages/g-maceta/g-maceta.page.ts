import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/firebase.sevice';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPublicacionComponent } from 'src/app/components/modal-publicacion/modal-publicacion.component';

@Component({
  selector: 'app-g-maceta',
  templateUrl: './g-maceta.page.html',
  styleUrls: ['./g-maceta.page.scss'],
  standalone: false
})
export class GMacetaPage implements OnInit {
  publicaciones: any[] = [];
  cargando = true;
  textoPublicacion = '';
  esAnonimo = false;
  constructor(private firebaseService: FirebaseService, private auth: AuthService, private router: Router, private modalCtrl: ModalController) {

  }

  async ngOnInit() {
    this.cargarPublicaciones();
    this.auth.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log('Usuario ya logueado', user);
      } else {
        console.log('No hay usuario logueado');
        this.router.navigate(['/registro']);
      }
    });
    this.esAnonimo = await this.auth.isAnonimo();
  
  }
  async crearPublicacion() {
    if (!this.textoPublicacion.trim()) return;

    await this.firebaseService.crearPublicacion(this.textoPublicacion);
    this.textoPublicacion = '';
    await this.cargarPublicaciones();
  }

  async cargarPublicaciones() {
    this.cargando = true;
    this.publicaciones = await this.firebaseService.obtenerPublicaciones();
    this.cargando = false;
  }

  async like(id: string) {
    await this.firebaseService.darLike(id);
    await this.cargarPublicaciones();
  }

  async dislike(id: string) {
    await this.firebaseService.darDislike(id);
    await this.cargarPublicaciones();
  }

  async abrirPost(post: any) {
    const modal = await this.modalCtrl.create({
      component: ModalPublicacionComponent,
      componentProps: {
        publicacion: post
      }
    });
    await modal.present();
  }





}
