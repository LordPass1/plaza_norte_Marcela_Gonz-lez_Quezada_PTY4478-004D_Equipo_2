import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GBIFAPIService } from 'src/app/services/gbif-api.service';
import { PernualApiService } from 'src/app/services/pernual-api.service';

@Component({
  selector: 'app-p-consejos',
  templateUrl: './p-consejos.page.html',
  styleUrls: ['./p-consejos.page.scss'],
  standalone: false
})
export class PConsejosPage implements OnInit {

  
  ngOnInit() {
  }

  query: string = '';
  speciesList: any[] = [];
  selectedSpecies: any = null;

  constructor(
    private gbifService: GBIFAPIService,
    public alertController: AlertController,
  ) {}

  // Buscar especies
  search() {
    if (this.query.trim() === '') return;
    this.gbifService.searchSpecies(this.query).subscribe(data => {
      this.speciesList = data.results;
      this.selectedSpecies = null;
    });
  }

  // Seleccionar una especie para ver detalles
  selectSpecies(species: any) {
    this.gbifService.getSpeciesDetail(species.key).subscribe(data => {
      this.selectedSpecies = data;
    });
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