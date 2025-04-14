import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TreffleService } from 'src/app/services/treffle.service';

@Component({
  selector: 'app-p-consejos',
  templateUrl: './p-consejos.page.html',
  styleUrls: ['./p-consejos.page.scss'],
  standalone: false
})
export class PConsejosPage implements OnInit {
  popularPlants: any[] = [];
  selectedPlant: any = null;
  plantTips: string[] = [];
  isLoading = false;
  searchQuery = '';
  searchResultsVisible = false; // Para controlar la visibilidad de los resultados de búsqueda

  constructor(
    private treffleService: TreffleService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadPopularPlants();
  }

  async presentAlert(header: string, error: any) {
    const alert = await this.alertController.create({
      header,
      message: JSON.stringify(error),
      buttons: ['OK']
    });
    await alert.present();
  }

  loadPopularPlants() {
    this.isLoading = true;
    this.treffleService.getPopularPlants(6).subscribe({
      next: (response: any) => {
        this.popularPlants = response.data || [];
        this.isLoading = false;
      },
      error: async (err) => {
        this.isLoading = false;
        await this.presentAlert('Error al cargar plantas populares', err);
      }
    });
  }

  searchPlants() {
    if (!this.searchQuery.trim()) {
      this.popularPlants = []; // Limpiar resultados si la búsqueda está vacía
      this.searchResultsVisible = false;
      return;
    }

    this.isLoading = true;
    this.treffleService.searchPlants(this.searchQuery).subscribe({
      next: (response: any) => {
        this.popularPlants = response.data || [];
        this.isLoading = false;
        this.searchResultsVisible = true; // Mostrar los resultados de búsqueda
      },
      error: async (err) => {
        this.isLoading = false;
        this.popularPlants = []; // Limpiar resultados en caso de error
        this.searchResultsVisible = true;
        await this.presentAlert('Error en búsqueda de plantas', err);
      }
    });
  }

  showPlantTips(plant: any) {
    this.selectedPlant = plant;
    this.isLoading = true;

    this.treffleService.getPlantCareTips(plant.id).subscribe({
      next: (tips: string[]) => {
        this.plantTips = tips;
        this.isLoading = false;
      },
      error: async (err) => {
        this.isLoading = false;
        this.plantTips = ['No se pudieron cargar consejos específicos para esta planta.'];
        await this.presentAlert('Error al cargar consejos', err);
      }
    });
  }

  clearSelection() {
    this.selectedPlant = null;
    this.plantTips = [];
  }

  // Método para obtener la imagen principal de la planta (si existe)
  getPlantImageUrl(plant: any): string | null {
    if (plant?.images && plant.images.length > 0) {
      return plant.images[0].url;
    }
    return null;
  }
}