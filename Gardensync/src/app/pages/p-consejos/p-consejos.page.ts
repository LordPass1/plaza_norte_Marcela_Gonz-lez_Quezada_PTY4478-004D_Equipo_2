import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GPTService } from 'src/app/services/gpt.service';

@Component({
  selector: 'app-p-consejos',
  templateUrl: './p-consejos.page.html',
  styleUrls: ['./p-consejos.page.scss'],
  standalone: false
})
export class PConsejosPage {
  gptResponse: any = null;
  rawResponse: string = '';
  loading = false;
  base64Image: string | null = null; // Guardar imagen para reusar en “Más Consejos”

  ngOnInit() {}

  constructor(private gptService: GPTService) {}

  // Solo toma la foto, la envía, y espera el JSON
  async tomarFotoYEnviar() {
    this.loading = true;
    this.gptResponse = null;
    this.rawResponse = '';
    this.base64Image = await this.gptService.takePicture();
    if (!this.base64Image) {
      this.loading = false;
      this.rawResponse = "No se seleccionó ninguna imagen.";
      return;
    }
    this.gptService.chatConGPT(this.base64Image).subscribe({
      next: (data) => {
        let responseText = data.choices[0].message.content.trim();
        const match = responseText.match(/{[\s\S]*}/);
        if (match) responseText = match[0];

        try {
          this.gptResponse = JSON.parse(responseText);
          this.rawResponse = '';
        } catch (e) {
          this.gptResponse = null;
          this.rawResponse = responseText;
        }
        this.loading = false;
      },
      error: (err) => {
        this.gptResponse = null;
        this.rawResponse = 'Error: ' + JSON.stringify(err);
        this.loading = false;
      }
    });
  }

  // Botón “Más Consejos”
  pedirMasConsejos() {
    if (!this.base64Image) return;
    this.loading = true;
    this.rawResponse = '';
    this.gptService.soloConsejos(this.base64Image).subscribe({
      next: (data) => {
        
        try {
          this.rawResponse = data.choices[0].message.content;
        } catch (e) {
          this.rawResponse = "No se pudieron obtener consejos.";
        }
        this.loading = false;
      },
      error: (err) => {
        this.rawResponse = 'Error: ' + JSON.stringify(err);
        this.loading = false;
      }
    });
  }

  isObject(val: any): boolean {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
  }
  
  formatJSON(text: string): string {
    try {
      return JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      return text;
    }
  }
}