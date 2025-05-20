import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantSearcherAPIService {

  constructor() { }

  buscarPlanta(nombre: string): Observable<any> {
    const nombreLower = nombre.trim().toLowerCase();

    // Puedes expandir este objeto con más plantas
    const mockPlantas: { [key: string]: any } = {
      'albahaca': {
        nombreComun: 'Albahaca',
        nombreCientifico: 'Ocimum basilicum',
        imagenes: [
          'https://upload.wikimedia.org/wikipedia/commons/4/4c/Basil-Basilico-Ocimum_basilicum-albahaca.jpg'
        ],
        tipo: 'Interior/Exterior',
        humedad: 'Media',
        comestible: true,
        venenosa: false,
        luz: 'Pleno sol o semisombra',
        consejos: [
          'Regar cuando la capa superficial del suelo esté seca.',
          'Evitar encharcamientos.',
          'Pellizcar las flores para prolongar el crecimiento.'
        ],
        sugerenciasSimilares: [
          'Orégano',
          'Tomillo',
          'Menta'
        ]
      },
      'cactus': {
        nombreComun: 'Cactus',
        nombreCientifico: 'Cactaceae',
        imagenes: [
          'https://upload.wikimedia.org/wikipedia/commons/e/e0/Cactus_collage.png'
        ],
        tipo: 'Interior/Exterior',
        humedad: 'Baja',
        comestible: false,
        venenosa: false,
        luz: 'Pleno sol',
        consejos: [
          'Riego moderado, solo cuando el sustrato esté completamente seco.',
          'Necesita mucha luz solar directa.',
          'Evitar el exceso de humedad.'
        ],
        sugerenciasSimilares: [
          'Suculentas',
          'Aloe vera',
          'Agave'
        ]
      }
      // Agrega más plantas aquí si quieres
    };

    // Respuesta mock o mensaje por defecto
    return of(mockPlantas[nombreLower] || {
      error: 'Planta no encontrada. Prueba con: Albahaca, Cactus.'
    });
  }

  // También puedes agregar un método para sugerencias mientras escribe:
  sugerirNombres(partial: string): Observable<string[]> {
    const todas = ['Albahaca', 'Cactus', 'Orégano', 'Menta', 'Tomillo', 'Aloe vera'];
    return of(
      todas.filter(n => n.toLowerCase().includes(partial.trim().toLowerCase()))
    );
  }
}