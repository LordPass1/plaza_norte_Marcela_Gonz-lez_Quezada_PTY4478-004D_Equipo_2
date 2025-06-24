import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { GPTService } from 'src/app/services/gpt.service';


@Component({
  selector: 'app-chat-asistente',
  templateUrl: './chat-asistente.component.html',
  styleUrls: ['./chat-asistente.component.scss'],
  standalone: false
})
export class ChatAsistenteComponent  implements OnInit {

  messages: Message[] = [];
  uInput = '';
  loading = false;
  data: any = {};

  constructor(private gpt: GPTService) { }

  ngOnInit() {
    this.gpt.planta$.subscribe(json =>{
      this.data = json;
      if(json['nombre_común']){
        this.messages.push({
          sender:'assistant',
          content:'He identicicado tu planta como:  '+json['nombre_común']
        })
      }
    })
  }

  async mandarMSG(){
    const text = this.uInput.trim();
    if(!text){return;}

    this.messages.push({sender: 'user', content: text});
    this.uInput = '';
    this.loading = true;

    try{
      const respuesta = await this.gpt.consejosPrompt(text, this.data);
      this.messages.push({sender:'assistant', content: respuesta});
    } catch (e){
      this.messages.push({sender: 'assistant', content: 'Lo siento ha ocurrido un error al procesar tu mensaje.'})
    }finally{
      this.loading = false;
    }
  }
}
