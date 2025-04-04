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

  constructor(
    private treffleService: TreffleService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadPopularPlants();
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
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudieron cargar las plantas populares. Inténtalo de nuevo más tarde.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  searchPlants() {
    if (!this.searchQuery.trim()) return;

    this.isLoading = true;
    this.treffleService.searchPlants(this.searchQuery).subscribe({
      next: (response: any) => {
        this.popularPlants = response.data || [];
        this.isLoading = false;
      },
      error: async (err) => {
        this.isLoading = false;
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se encontraron plantas con ese nombre.',
          buttons: ['OK']
        });
        await alert.present();
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
        
        const alert = await this.alertController.create({
          header: 'Información',
          message: 'Consejos limitados disponibles para esta planta.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  clearSelection() {
    this.selectedPlant = null;
    this.plantTips = [];
  }
}
