import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { asapScheduler, BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { Agent, run, setDefaultOpenAIClient } from '@openai/agents';
import { OpenAI } from 'openai';
import { AlertController } from '@ionic/angular';
import { ControlContainer } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GPTService {
  //para obtener el JSON de la API openAI
  private apiKey = environment.gkey.testKey;
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  //OpenAI client para el SDK Assistant
  private client : OpenAI;
  private BotaniBot: Agent;
  
  //BehaviorSubject
  private plantaSubject = new BehaviorSubject<any>({}); //JSON de la planta
  //Subscibe ;) 
  public planta$ = this.plantaSubject.asObservable();


  constructor(private http: HttpClient, private alertController: AlertController) {
    this.client = new OpenAI({
      apiKey: this.apiKey,
      dangerouslyAllowBrowser: true
    })
    setDefaultOpenAIClient(this.client as any);

    this.BotaniBot = new Agent({
      name: 'BotaniBot',
      instructions: 'Eres un experto botánico.',
      model: 'o4-mini'
    });
   }
  //Agente

  async presentAlert(t:string,st:string,m:any) {
    const alert = await this.alertController.create({
      header: t,
      subHeader: st,
      message: m,
      buttons: ['OK'],
    });
    await alert.present()
  }
  //—————————————— función para obtener el JSON ——————————————
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
      tap(raw => this.presentAlert('[GPTService]', 'Raw HTTP response:  ',raw)),
      map(raw => {
        const content = raw.choices?.[0]?.message?.content ?? '';
        console.log('[GPTService] Raw content string: ', content)
        try{
          return JSON.parse(content);
        }catch (e){
          console.error('[GPTService] JSON.parse failed: ', e)
          this.presentAlert('[GPTService]', 'JSON.parse failed:  ', e);
          return{};
        }
      }),
      tap(parsed => {
        console.log('[GPTService] Parsed JSON object:', parsed)
        this.presentAlert('GPTService','parsedd JSON:', parsed)
        this.plantaSubject.next(parsed)
      })
    );
  }
  

   // —————————————— nuevo método de chat ——————————————
  async consejosPrompt(prompt: string, jsonData: any): Promise<string> {
    const systemContent = `Estos son los datos de la planta (JSON): ${JSON.stringify(jsonData, null, 2)}
    Ahora responde basándote en esta información
    Deberas explicarle al usuario tus consejos.
    Tus consejos no deberan ser mas largos que 500 caracteres`.trim();

    const result = await run(this.BotaniBot, [
      { role: 'system', content: systemContent },
      { role: 'user', content: prompt }
    ]);

    return result.finalOutput as string;
  }
}