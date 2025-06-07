import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/firebase.sevice';

@Component({
  selector: 'app-modal-publicacion',
  templateUrl: './modal-publicacion.component.html',
  styleUrls: ['./modal-publicacion.component.scss'],
  standalone: false
})
export class ModalPublicacionComponent {
  @Input() publicacion: any;
  nuevoComentario: string = '';
  cargandoComentarios: boolean = false;
  comentarios: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit() {
    await this.cargarComentarios();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async cargarComentarios() {
    this.cargandoComentarios = true;
    this.comentarios = await this.firebaseService.obtenerComentarios(this.publicacion.id);
    this.cargandoComentarios = false;
  }

  async enviarComentario() {
    if (!this.nuevoComentario.trim()) return;

    await this.firebaseService.comentar(this.publicacion.id, this.nuevoComentario);
    this.nuevoComentario = '';
    await this.cargarComentarios();
  }

  async like() {
    await this.firebaseService.darLike(this.publicacion.id);
  }

  async dislike() {
    await this.firebaseService.darDislike(this.publicacion.id);
  }
}
