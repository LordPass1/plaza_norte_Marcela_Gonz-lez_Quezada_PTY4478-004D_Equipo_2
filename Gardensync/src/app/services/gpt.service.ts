import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { asapScheduler, BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { Agent, run } from '@openai/agents';
import { AlertController } from '@ionic/angular';
import { ControlContainer } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GPTService {

  private apiKey = environment.gkey.testKey;
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  //Agente
  private BotaniBot = new Agent({
    name: "BotaniBot",
    instructions: "Eres un experto botanico",
    model: "o4-mini",
  })

  //BehaviorSubject
  private plantaSubject = new BehaviorSubject<any>({}); //JSON de la planta
  //Subscibe ;) 
  public planta$ = this.plantaSubject.asObservable();

  constructor(private http: HttpClient,
              private alertController: AlertController
  ) { }

  async presentAlert(t:string,st:string,m:any) {
    const alert = await this.alertController.create({
      header: t,
      subHeader: st,
      message: m,
      buttons: ['Action'],
    });
  }
  enviarImagen(base64Image: string): Observable<any> {
    const SYSTEM_PROMPT = `
Eres un experto botánico al cual le estoy pasando una imagen de una planta. 
Debes identificar la planta y responder **exclusivamente** usando el siguiente objeto JSON (sin ningún texto antes o después):
{
  "nombre_común": "",
  "nombres_científicos": [],
  "otros_nombres": [],
  "familia": "",
  "origen": null,
  "tipo": "",
  "dimensiones": {
    "tipo": null,
    "valor_mínimo": null,
    "valor-máximo": null,
    "unidad": ""
  },
  "ciclo": "",
  "riego": "",
  "referencia_general_riego": {
    "valor": null,
    "unidad": ""
  },
  "anatomía_de_la_planta": [
    {
      "parte": "",
      "color": []
    }
  ],
  "exposición_al_sol": [],
  "meses_de_poda": [],
  "frecuencia_de_poda": {
    "cantidad": null,
    "intervalo": ""
  },
  "semillas": null,
  "atrae": [],
  "propagación": [],
  "resistencia": {
    "mínima": null,
    "máxima": null
  },
  "ubicación_mapa_de_resistencia": {
    "url_completa": "",
    "iframe_completo": ""
  },
  "flores": null,
  "temporada_de_floración": "",
  "suelo": [],
  "susceptibilidad_a_plagas": null,
  "piñas": null,
  "frutos": null,
  "fruto_comestible": null,
  "temporada_de_fructificación": null,
  "temporada_de_cosecha": null,
  "método_de_cosecha": "",
  "hoja": null,
  "hoja_comestible": null,
  "tasa_de_crecimiento": "",
  "mantenimiento": "",
  "medicinal": null,
  "tóxico_para_humanos": null,
  "tóxico_para_mascotas": null,
  "tolerante_a_la_sequía": null,
  "tolerante_a_la_sal": null,
  "espinoso": null,
  "invasivo": null,
  "raro": null,
  "tropical": null,
  "culinario": null,
  "interior": null,
  "nivel_de_cuidado": "",
  "descripción": "",
  "calidades_de_riego": [],
  "periodos_de_riego": [],
  "volumen_promedio_requerido_de_riego": [],
  "profundidad_requerida_de_riego": [],
  "riego_según_temperatura": {
    "unidad": "",
    "mínimo": null,
    "máximo": null
  },
  "nivel_de_ph_del_agua": {
    "mínimo": null,
    "máximo": null
  },
  "duración_de_luz_solar": {
    "mínimo": null,
    "máximo": null,
    "unidad": ""
  }
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
    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      tap(res => this.presentAlert('[GPTService]', 'Rawresponse:  ',res)),
      map(res => {
        const content: string = res.choices?.[0]?.message?.content ?? '';
        this.presentAlert('[GPTService]', 'Rawresponse string:  ',content);
        try{
          return JSON.parse(content);
        }catch (e){
          this.presentAlert('[GPTService]', 'JSON.parse failed:  ', e);
          return{};
        }
      }),
      tap(parsed => {
        this.presentAlert('GPTService','parsedd JSON:', parsed)
        this.plantaSubject.next(parsed)
      })
    );
  }
  

  async consejosPrompt(prompt: string, json_archivo: any): Promise<string> {
    const result = await run(this.BotaniBot, prompt, json_archivo);
    // result.finalOutput contiene la respuesta en texto plano
    return result.finalOutput as string;
  }
}