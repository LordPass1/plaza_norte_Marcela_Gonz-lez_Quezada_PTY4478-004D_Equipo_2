import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { asapScheduler, BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Agent, run, setDefaultOpenAIClient } from '@openai/agents';
import { OpenAI } from 'openai';
import { AlertController } from '@ionic/angular';
import { ControlContainer } from '@angular/forms';
import { environment_prod } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class GPTService {
  //para obtener el JSON de la API openAI
  private apiKey = environment_prod.gkey.testKey;
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
  "nombre_comun": "",
  "nombres_cientificos": [],
  "otros_nombres": [],
  "familia": "",
  "origen": null,
  "tipo": "",
  "dimensiones": {
    "tipo": null,
    "valor_minimo": null,
    "valor-máximo": null,
    "unidad": ""
  },
  "ciclo": "",
  "riego": "",
  "referencia_general_riego": {
    "valor": null,
    "unidad": ""
  },
  "anatomia_de_la_planta": [
    {
      "parte": "",
      "color": []
    }
  ],
  "exposicion_al_sol": [],
  "meses_de_poda": [],
  "frecuencia_de_poda": {
    "cantidad": null,
    "intervalo": ""
  },
  "semillas": null,
  "atrae": [],
  "propagacion": [],
  "resistencia": {
    "minima": null,
    "máxima": null
  },
  "ubicacion_mapa_de_resistencia": {
    "url_completa": "",
    "iframe_completo": ""
  },
  "flores": null,
  "temporada_de_floracion": "",
  "suelo": [],
  "susceptibilidad_a_plagas": null,
  "piñas": null,
  "frutos": null,
  "fruto_comestible": null,
  "temporada_de_fructificacion": null,
  "temporada_de_cosecha": null,
  "método_de_cosecha": "",
  "hoja": null,
  "hoja_comestible": null,
  "tasa_de_crecimiento": "",
  "mantenimiento": "",
  "medicinal": null,
  "toxico_para_humanos": null,
  "toxico_para_mascotas": null,
  "tolerante_a_la_sequia": null,
  "tolerante_a_la_sal": null,
  "espinoso": null,
  "invasivo": null,
  "raro": null,
  "tropical": null,
  "culinario": null,
  "interior": null,
  "nivel_de_cuidado": "",
  "descripcion": "",
  "calidades_de_riego": [],
  "periodos_de_riego": [],
  "volumen_promedio_requerido_de_riego": [],
  "profundidad_requerida_de_riego": [],
  "riego_según_temperatura": {
    "unidad": "",
    "minimo": null,
    "máximo": null
  },
  "nivel_de_ph_del_agua": {
    "minimo": null,
    "máximo": null
  },
  "duracion_de_luz_solar": {
    "minimo": null,
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
    const hasJson = jsonData && Object.keys(jsonData).length > 0;
    const contextJson = hasJson
      ? JSON.stringify(jsonData, null, 2)
      : '';

    // Instrucciones condicionales
    let systemContent = hasJson
      ? `Eres un experto botánico que explica conceptos de forma sencilla a un primerizo.
        He identificado la planta como **${jsonData['nombre_común']}**. Estos son sus datos en JSON: ${contextJson}`
      : `Eres un experto botánico que explica conceptos de forma sencilla a un primerizo.
        No se ha identificado ninguna planta mediante imagen. El usuario puede nombrar directamente la planta sobre la que desea consejos.
        Cuando debas responder con una lista de ítems,
        sigue este formato:
        1. Usa numeración (1., 2., 3., …).
        2. Ordena los ítems alfabéticamente (o por la clave que corresponda).
        3. Se claro y conciso en cada punto.`;

    // Regla de filtro de temas
    systemContent += `Responde **solo** preguntas de botánica aplicadas a la planta (si la tienes) o al nombre de planta que el usuario indique.  
                      Si te preguntan algo que NO sea botánica o no tenga que ver con una planta, responde exactamente:
                      “No entiendo tu pregunta. ¿‘<lo que preguntaron>’ es una planta?”.
                      Si te saludan con "Hola" deberas responder "Hola, soy BotaniBot, tu asistente experto en botanica, ¿En que te puedo ayudar el día de hoy?."
                      `;
    systemContent = systemContent.trim();

    const agent = new Agent({
      name: 'BotaniBot',
      instructions: systemContent,
      model: 'o4-mini'
    });

    // 6) Ejecutamos
    const result = await run(agent, prompt);
    return result.finalOutput as string;
  }

  obtenerConsejosPorNombre(nombre: string): Observable<any> {
    const SYSTEM_PROMPT = `
Eres un experto botánico. Dame consejos prácticos y simples para el cuidado de la planta llamada "${nombre}". 
Responde en formato JSON y asegúrate de que todos los campos y textos estén en español:
{
  "scientific_name": [],
  "family": "",
  "watering": "",
  "description": ""
}
Solo responde con el objeto JSON solicitado. No escribas ningún texto adicional antes o después del JSON.
`;

    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `¿Cómo cuido una planta llamada ${nombre}? Responde en español.` }
      ],
      max_tokens: 600
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}