import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PernualApiService {

  private apiKey = environment.perenualeApiKey;
  private baseUrl = 'https://perenual.com/api/species/details'; // Endpoint correcto para detalles

  constructor(private http: HttpClient) {}

  getDetallePlanta(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    const params = new HttpParams().set('key', this.apiKey);
  
    return this.http.get(url, { params }).pipe(
      tap(response => console.log('Respuesta de la API (JSON):', response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red.
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // El servidor devolvió una respuesta de error.
      console.error(
        `El servidor devolvió el código ${error.status}, ` +
        `el cuerpo del error fue: ${error.error}`
      );
    }
    // Devuelve un Observable de error para que el componente pueda suscribirse a él.
    return throwError(() => 'Algo salió mal; por favor, inténtalo de nuevo más tarde.');
  }
}