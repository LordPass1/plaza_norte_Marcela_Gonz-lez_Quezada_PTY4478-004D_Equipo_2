import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
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
}
