import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GBIFAPIService {
  
  private apiUrl = 'https://api.gbif.org/v1';

  constructor(private http: HttpClient) {}

  // Buscar especies por nombre
  searchSpecies(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/species/search?q=${query}`);
  }

  // Obtener detalles de una especie por su ID
  getSpeciesDetail(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/species/${id}`);
  }
}