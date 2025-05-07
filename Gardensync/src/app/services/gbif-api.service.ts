import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

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

  buscarPlantas(query: string) {
    return this.http.get<any>(`${this.apiUrl}/species/search?q=${query}&kingdomKey=6`)
      .pipe(
        map(res => res.results.filter((r: any) =>
          r.kingdomKey === 6 &&
          r.scientificName &&
          r.kingdom &&
          r.family &&
          r.genus &&
          r.rank
        )),
        catchError(err => throwError(() => new Error('Error al buscar plantas')))
      );
  }
  
}