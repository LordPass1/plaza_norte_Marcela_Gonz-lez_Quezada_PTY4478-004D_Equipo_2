import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GBIFAPIService {
  
  private baseUrl = 'https://api.gbif.org/v1';
  private APIKEY = ""

  constructor(private http : HttpClient) { }

  buscarPlantas(query: string): Observable<any> {
    const url = `${this.baseUrl}/species/search?q=${encodeURIComponent(query)}&kingdom=Plantae`;
    return this.http.get(url);
  }
  
  getDetallesPlanta(id: number): Observable<any> {
    const url = `${this.baseUrl}/species/${id}`;
    return this.http.get(url);
  }

  getDatosPlanta(taxonKey: number): Observable<any> {
    const url = `${this.baseUrl}/occurrence/search?taxon_key=${taxonKey}`;
    return this.http.get(url);
  }
}