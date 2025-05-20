import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PlantSearcherAPIService } from 'src/app/services/plant-searcher-api.service';


@Component({
  selector: 'app-p-consejos',
  templateUrl: './p-consejos.page.html',
  styleUrls: ['./p-consejos.page.scss'],
  standalone: false
})
export class PConsejosPage {
  query = '';
  resultado: any = null;
  sugerencias: string[] = [];

  constructor(
    private plantSearcher: PlantSearcherAPIService,
    private alertController: AlertController
  ) {}

  buscarPlanta() {
    this.plantSearcher.buscarPlanta(this.query).subscribe(res => {
      this.resultado = res;
    });
  }

  sugerirNombres(event: any) {
    const valor = event.target.value;
    if (valor && valor.length >= 2) {
      this.plantSearcher.sugerirNombres(valor).subscribe(sugs => {
        this.sugerencias = sugs;
      });
    } else {
      this.sugerencias = [];
    }
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