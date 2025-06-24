import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { filter, skip } from 'rxjs';
import { GPTService } from 'src/app/services/gpt.service';

@Component({
  selector: 'app-p-consejos',
  templateUrl: './p-consejos.page.html',
  styleUrls: ['./p-consejos.page.scss'],
  standalone: false
})
export class PConsejosPage {
  data: any = {};
  loading = false;

  constructor(private gptService: GPTService,
              private alertController: AlertController
  ) {}

  ngOnInit(){
    this.gptService.planta$.pipe(filter(obj => obj && Object.keys(obj).length>0))
    .subscribe(json =>{
      this.presentAlert('[PConsejosPage]','planta$ emission:', json);
      this.data = json;
    })
  }

  async datosImagen() {
    this.loading = true;
    try{
      const base64Image = await this.tomarFoto();
      if (!base64Image){
        this.presentAlert('Algo salio mal :(', 'No se ha proporcionado una imagen', 'Debe proporcionar una Imagen para poder utilizar esta función' )
        this.loading = false;
        return;
      }
      this.gptService.enviarImagen(base64Image).subscribe({
        next: parsedJson => {
          this.presentAlert('[PConsejosPage]','subscribe next:  ', JSON.stringify(parsedJson, null, 2));
          this.loading = false;
        },
        error: err => {
          console.error('[PConsejosPage] subscribe error:', err);
          this.presentAlert('Error API', '', typeof err === 'string' ? err : JSON.stringify(err, null, 2));
          this.loading = false;
        }
      });
    } catch(e){
      this.presentAlert('Error','Error en datosImagen():  ',e)
      this.loading = false
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

  recibirJson(){

  }

  pedirConsejos(){
    
  }
}
