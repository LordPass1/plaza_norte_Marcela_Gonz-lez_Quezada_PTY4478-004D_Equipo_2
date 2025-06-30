import { Injectable } from '@angular/core';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor() { }

  public async init(){
    const perm = await PushNotifications.requestPermissions();
    if (perm.receive !== 'granted'){
      console.error('Permisos de notificacion denegado')
      return
    }
    await PushNotifications.register();
    //Guardar en RTDB
    PushNotifications.addListener('registration', (t: Token) => {
      const deviceId = navigator.onLine ? 'mobile_app' : 'unknown'; 
      // O usa un ID de usuario, o tu propia lógica
      this.db.object(`tokens/${deviceId}`).set(t.value);
    });

    PushNotifications.addListener('pushNotificationReceived', (note: PushNotificationSchema) => {
      console.log('Push recibido:', note);
      // Opcional: lanzar local notification si quieres personalizar
    });

    // 5. Cuando el usuario interactúa con ella
    PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
      console.log('Clic en notificación:', action);
      // Navegar a una pantalla concreta, p.ej. con NavController
    });  }

  

}
