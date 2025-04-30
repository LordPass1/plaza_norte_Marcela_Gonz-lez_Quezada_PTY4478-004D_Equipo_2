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

  constructor(private http: HttpClient) { }

  getPlantDetails(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    const params = new HttpParams().set('key', this.apiKey);
  
    return this.http.get(url, { params }).pipe(
      tap(response => console.log('Respuesta de la API (JSON):', response)),
      catchError(this.handleError)
    );
  }
  

  private handleError(error: any) {
    console.error('Error en la petición:', error.status, error.message);
    return throwError(() => 'Ocurrió un error al obtener los detalles de la planta.');
  }
}