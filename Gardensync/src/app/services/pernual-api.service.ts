import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PernualApiService {

  private apiKey = environment.perenualeApiKey;
  private baseUrl = 'https://perenual.com/api/species/details';

  constructor(private http: HttpClient) {}

   // Trae los datos completos
   getPlantDetails(id: number): Observable<any> {
    const url = `${this.baseUrl}/species/details/${id}?key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  // Funciones individuales para extraer información:

  getCommonName(plant: any): string {
    return plant?.common_name || 'Nombre no disponible';
  }

  getScientificNames(plant: any): string {
    return plant?.scientific_name?.join(', ') || 'Nombre científico no disponible';
  }

  getOtherNames(plant: any): string {
    return plant?.other_name?.join(', ') || 'Otros nombres no disponibles';
  }

  getLifeCycle(plant: any): string {
    return plant?.cycle || 'Ciclo de vida no disponible';
  }

  getWateringNeeds(plant: any): string {
    return plant?.watering || 'Datos de riego no disponibles';
  }

  getSunlightNeeds(plant: any): string {
    return plant?.sunlight?.join(', ') || 'Datos de luz no disponibles';
  }

  getImageUrl(plant: any): string {
    return plant?.default_image?.regular_url || 'URL no disponible';
  }

  getWateringAdvice(plant: any): string {
    return plant?.care_guides?.watering_general_benchmark?.value || 'Consejo de riego no disponible';
  }
}