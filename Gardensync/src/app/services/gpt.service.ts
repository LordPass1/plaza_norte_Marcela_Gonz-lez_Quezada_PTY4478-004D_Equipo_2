import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GPTService {

  private apiKey = environment.gkey;
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  
  constructor(private http: HttpClient) { }

  async takePicture(): Promise<string | null> {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Base64, // O DataUrl
      source: CameraSource.Prompt, // Galería o cámara
    });

    return image?.base64String ?? null;
  }

  chatConGPT(base64Image: string): Observable<any> {
    const SYSTEM_PROMPT = `
Eres un experto botánico al cual le estoy pasando una imagen de una planta. 
Debes identificar la planta y responder **exclusivamente** usando el siguiente objeto JSON (sin ningún texto antes o después):

{
  "id": number,
  "common_name": string,
  "scientific_name": string[],
  "other_name": string[],
  "family": string,
  "origin": string|null,
  "type": string,
  "dimensions": {
    "type": string|null,
    "min_value": number,
    "max_value": number,
    "unit": string
  },
  "cycle": string,
  "watering": string,
  "watering_general_benchmark": {
    "value": number,
    "unit": string
  },
  "plant_anatomy": { part: string, color: string[] }[],
  "sunlight": string[],
  "pruning_month": string[],
  "pruning_count": { amount: number, interval: string },
  "seeds": number,
  "attracts": string[],
  "propagation": string[],
  "flowers": boolean,
  "flowering_season": string|null,
  "soil": any[],
  "pest_susceptibility": any|null,
  "cones": boolean,
  "fruits": boolean,
  "edible_fruit": boolean,
  "fruiting_season": string|null,
  "harvest_season": string|null,
  "harvest_method": string,
  "leaf": boolean,
  "edible_leaf": boolean,
  "growth_rate": string,
  "maintenance": string,
  "medicinal": boolean,
  "poisonous_to_humans": boolean,
  "poisonous_to_pets": boolean,
  "drought_tolerant": boolean,
  "salt_tolerant": boolean,
  "thorny": boolean,
  "invasive": boolean,
  "rare": boolean,
  "tropical": boolean,
  "cuisine": boolean,
  "indoor": boolean,
  "care_level": string,
  "description": string,
  "default_image": { image_id: number, license: number, license_name: string, license_url: string, original_url: string, regular_url: string, medium_url: string, small_url: string, thumbnail: string },
  "other_images": Array< { image_id: number, license: number, license_name: string, license_url: string, original_url: string, regular_url: string, medium_url: string, small_url: string, thumbnail: string } >,
  "xWateringQuality": string[],
  "xWateringPeriod": string[],
  "xWateringAvgVolumeRequirement": any[],
  "xWateringDepthRequirement": any[],
  "xWateringBasedTemperature": { unit: string, min: number, max: number },
  "xWateringPhLevel": { min: number, max: number },
  "xSunlightDuration": { min: string, max: string, unit: string }
    }
  Solo responde con el objeto JSON solicitado. No escribas ningún texto adicional antes o después del JSON. Si no puedes identificar la planta, responde con un JSON vacío ({}).
`;
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
          ]
        }
      ],
      max_tokens: 1800
    };
    return this.http.post(this.apiUrl, body, { headers });
  }

  soloConsejos(base64Image: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Eres un experto botánico.' },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Dame más consejos sobre esta planta' },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
          ]
        }
      ],
    max_tokens: 500
    };
    return this.http.post(this.apiUrl, body, { headers });
  }
}
