import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-usuariosregistrados',
  templateUrl: './usuariosregistrados.page.html',
  styleUrls: ['./usuariosregistrados.page.scss'],
  standalone: false
})
export class UsuariosregistradosPage implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

}
