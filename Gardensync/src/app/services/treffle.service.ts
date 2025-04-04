import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { catchError, map, of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TreffleService {
  private readonly API_URL = 'https://trefle.io/api/v1';
  private readonly API_KEY = environment.treffleApiKey; // Configura esto en environment.ts

  constructor(private http: HttpClient) { }

  // Ejemplo: Buscar plantas por nombre
  searchPlants(query: string, page: number = 1) {
    return this.http.get(`${this.API_URL}/plants/search`, {
      params: {
        token: this.API_KEY,
        q: query,
        page: page.toString()
      }
    });
  }

  // Obtener detalles de una planta específica
  getPlantDetails(id: number) {
    return this.http.get(`${this.API_URL}/plants/${id}`, {
      params: {
        token: this.API_KEY
      }
    });
  }

  // Listar plantas (puedes añadir más parámetros según necesites)
  listPlants(page: number = 1, filter?: any) {
    let params: any = {
      token: this.API_KEY,
      page: page.toString()
    };

    if (filter) {
      params = { ...params, ...filter };
    }

    return this.http.get(`${this.API_URL}/plants`, { params });
  }

  //PAGINA CONSEJOS

  // Obtener consejos generales basados en características de plantas
  getPlantCareTips(plantId: number) {
    if (!plantId) {
      return throwError(() => new Error('ID de planta no válido'));
    }
  
    return this.http.get(`${this.API_URL}/plants/${plantId}`, {
      params: { token: this.API_KEY }
    }).pipe(
      map((response: any) => {
        if (!response?.data) {
          throw new Error('Datos de planta no disponibles');
        }
        return this.extractTipsFromPlantData(response.data);
      }),
      catchError((error) => {
        console.error('Error al obtener consejos para la planta:', error);
        return of(['No se pudieron cargar consejos específicos. Por favor, intenta nuevamente.']);
      })
    );
  }

  // Extraer consejos de los datos de la planta
  private extractTipsFromPlantData(plantData: any): string[] {
    const tips: string[] = [];
    
    if (plantData.growth) {
      if (plantData.growth.ph_minimum && plantData.growth.ph_maximum) {
        tips.push(`Esta planta prefiere un pH del suelo entre ${plantData.growth.ph_minimum} y ${plantData.growth.ph_maximum}.`);
      }
      
      if (plantData.growth.light) {
        tips.push(`Recomendación de luz: ${plantData.growth.light}.`);
      }
      
      if (plantData.growth.atmospheric_humidity) {
        tips.push(`Humedad atmosférica ideal: ${plantData.growth.atmospheric_humidity}%.`);
      }
    }
    
    if (plantData.specifications) {
      if (plantData.specifications.toxicity) {
        tips.push(`Precaución: ${plantData.specifications.toxicity.toLowerCase() === 'yes' ? 'Esta planta puede ser tóxica.' : 'Esta planta no se considera tóxica.'}`);
      }
      
      if (plantData.specifications.shape_and_orientation) {
        tips.push(`Forma y orientación: ${plantData.specifications.shape_and_orientation}.`);
      }
    }
    
    if (plantData.flower && plantData.flower.color) {
      tips.push(`Color de flor: ${plantData.flower.color}.`);
    }
    
    // Consejo genérico si no hay mucha información
    if (tips.length === 0) {
      tips.push('Consulta fuentes adicionales para consejos específicos sobre esta planta.');
    }
    
    return tips;
  }

  // Obtener plantas populares para mostrar consejos
  getPopularPlants(limit: number = 5) {
    return this.http.get(`${this.API_URL}/plants`, {
      params: {
        token: this.API_KEY,
        page_size: limit.toString(),
        order: 'popularity'
      }
    });
  }
}
