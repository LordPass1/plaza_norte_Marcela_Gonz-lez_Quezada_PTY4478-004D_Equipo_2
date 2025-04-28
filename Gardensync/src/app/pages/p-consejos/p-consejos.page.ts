import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PernualApiService } from 'src/app/services/pernual-api.service';

@Component({
  selector: 'app-p-consejos',
  templateUrl: './p-consejos.page.html',
  styleUrls: ['./p-consejos.page.scss'],
  standalone: false
})
export class PConsejosPage implements OnInit {

  plantId !: number;
  plantData: any;
  error: string | null = null;

  constructor(
    private perenualAPI : PernualApiService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}