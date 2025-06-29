import { Component, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { filter, skip } from 'rxjs';
import { Message } from 'src/app/models/message';
import { GPTService } from 'src/app/services/gpt.service';

@Component({
  selector: 'app-p-consejos',
  templateUrl: './p-consejos.page.html',
  styleUrls: ['./p-consejos.page.scss'],
  standalone: false
})
export class PConsejosPage {
  data: any = {};
  messages: Message[] = [];
  uInput = '';
  isLoading = false;
  segmentValue: 'identificacion' | 'chat' = 'identificacion';
  foto = ''

  constructor(private gptService: GPTService,
              private alertController: AlertController
  ) {}

  ngOnInit() {
    // Cuando llegue el JSON de identificación, mostramos aviso y mensaje inicial
    this.gptService.planta$
      .pipe(filter(obj => obj && Object.keys(obj).length > 0))
      .subscribe(json => {
        this.data = json;
        this.presentAlert('Planta identificada', '', JSON.stringify(json, null, 2));
        if (json.nombre_comun) {
          this.messages.push({
            sender: 'assistant',
            content: 'He identificado tu planta como: ' + json.nombre_comun
          });
        }
      });
  }

  async datosImagen() {
  this.isLoading = true;
  try {
    const base64Image = await this.tomarFoto();
    if (!base64Image) {
      this.presentAlert('Error', 'No proporcionaste una imagen', 'Debes seleccionar una foto');
      this.isLoading = false;
      return;
    }
    // Asigna la foto tomada al atributo foto
    this.foto = `data:image/jpeg;base64,${base64Image}`;
    this.gptService.enviarImagen(base64Image).subscribe({
      next: parsedJson => {
        this.isLoading = false;
      },
      error: err => {
        this.presentAlert('Error API', '', typeof err === 'string' ? err : JSON.stringify(err));
        this.isLoading = false;
      }
    });
  } catch (e) {
    this.presentAlert('Error cámara', '', JSON.stringify(e));
    this.isLoading = false;
  }
}

  async mandarMSG() {
    const texto = this.uInput.trim();
    if (!texto) return;
    this.messages.push({ sender: 'user', content: texto });
    this.uInput = '';
    this.isLoading = true;

    try {
      const reply = await this.gptService.consejosPrompt(texto, this.data);
      this.messages.push({ sender: 'assistant', content: reply });
    } catch (err: any) {
      const errMsg = err.message ?? JSON.stringify(err);
      this.messages.push({ sender: 'assistant', content: `Error: ${errMsg}` });
    } finally {
      this.isLoading = false;
    }
  }
  
  private async tomarFoto(): Promise<string | null> {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Base64, 
      source: CameraSource.Prompt,
    });
    return image?.base64String ?? null;
  }

  async presentAlert(t:string,st:string,m:any) {
    const alert = await this.alertController.create({
      header: t,
      subHeader: st,
      message: m,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
