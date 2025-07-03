import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonButton, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-ban-modal',
  templateUrl: './ban-modal.component.html',
    styles: [`
    .ion-padding {
      .icon {
        font-size: 4rem;
        text-align: center;
        margin-bottom: 1rem;
      }
      h2 {
        text-align: center;
        color: #b71c1c;
        margin-bottom: 0.5rem;
      }
      p {
        text-align: center;
        color: #555;
      }
    }
  `],
  imports: [IonContent, IonButton],
})
export class BanModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
