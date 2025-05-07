import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GBIFAPIService } from 'src/app/services/gbif-api.service';
import { PernualApiService } from 'src/app/services/pernual-api.service';

@Component({
  selector: 'app-p-consejos',
  templateUrl: './p-consejos.page.html',
  styleUrls: ['./p-consejos.page.scss'],
  standalone: false
})
export class PConsejosPage {
  query: string = '';
  speciesList: any[] = [];
  selectedSpecies: any = null;
  imagenPlanta: string | null = null;

  constructor(
    private gbifService: GBIFAPIService,
    private perenualService: PernualApiService,
    private alertController: AlertController
  ) {}

  search() {
    if (this.query.trim() === '') return;
  
    this.gbifService.searchSpecies(this.query).subscribe({
      next: data => {
        const resultados = data.results
          .filter((item: any) => item.kingdom === 'Plantae')
          .filter((value: any, index: number, self: any[]) =>
            index === self.findIndex((t: any) => t.scientificName === value.scientificName)
          );
        this.speciesList = resultados;
        this.selectedSpecies = null;
        this.imagenPlanta = null;
      },
      error: () => this.presentAlert('Error', 'No se pudieron cargar las especies')
    });
  }  

  selectSpecies(species: any) {
    this.selectedSpecies = null;
    this.imagenPlanta = null;

    this.gbifService.getSpeciesDetail(species.key).subscribe({
      next: data => {
        this.selectedSpecies = data;

        // Buscar imagen usando nombre científico exacto
        this.perenualService.buscarImagenPorNombre(data.scientificName).subscribe({
          next: img => this.imagenPlanta = img,
          error: () => this.imagenPlanta = null
        });
      },
      error: () => this.presentAlert('Error', 'No se pudieron cargar los detalles')
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