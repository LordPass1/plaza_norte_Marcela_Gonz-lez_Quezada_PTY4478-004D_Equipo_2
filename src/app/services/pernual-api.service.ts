import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PernualApiService {
  private apiKey = environment.perenualeApiKey;
  private baseUrl = 'https://perenual.com/api';

  constructor(private http: HttpClient) {}

  // Paso 1: Buscar plantas por nombre científico exacto
  buscarImagenPorNombre(nombreCientifico: string): Observable<string | null> {
    const url = `https://perenual.com/api/species-list?key=${this.apiKey}&q=${encodeURIComponent(nombreCientifico)}`;
  
    return this.http.get<any>(url).pipe(
      map(response => {
        const nombreBuscado = nombreCientifico.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
        const planta = response.data.find((planta: any) => {
          const sciName = planta.scientific_name;
          if (typeof sciName !== 'string') return false;
  
          const sciNameNormalizado = sciName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          return sciNameNormalizado.includes(nombreBuscado);
        });
  
        if (planta?.default_image?.original_url) {
          return planta.default_image.original_url;
        } else {
          throw new Error('No se encontró la planta');
        }
      }),
      catchError(err => {
        console.error('Error buscando ID:', err);
        return throwError(() => new Error('No se encontró la planta'));
      })
    );
  }
    

  // Detalles de planta por ID
  getPlantDetails(id: number): Observable<any> {
    const url = `${this.baseUrl}/species/details/${id}`;
    const params = new HttpParams().set('key', this.apiKey);
    return this.http.get(url, { params });
  }
}
