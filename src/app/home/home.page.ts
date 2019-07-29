import { Component, OnInit } from '@angular/core';
import {AuthService} from '../servicios/auth.service';
//Importamos el servicio de chats 
import {ChatsService,chat} from '../servicios/chats.service';
//Importamos Modal Controller
import {ModalController} from '@ionic/angular'
//Importamos el componente chat 
import {ChatComponent} from '../componentes/chat/chat.component';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //Creamos una variable que sera un array
  public chatsRoom :any  =[];

  constructor(public authservice :AuthService,public chatservice:ChatsService,private modal:ModalController
    ,public actionSheetController: ActionSheetController){

  }
onLogOut(){

this.authservice.logout();
}

ngOnInit(){
// Retorna objetos para ver sus cambios en tiempo real
  this.chatservice.getChatRoom().subscribe(chats => {

    this.chatsRoom = chats;
    })
   
}

abrirChat(chat){

this.modal.create({

  component: ChatComponent,
  componentProps: {
   chat: chat
  }

}).then((modal)=> modal.present())

}

async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Opciones',
    buttons: [{
      text: 'Cerrar Sesión',
      role: 'destructive',
      icon: 'log-out',
      handler: () => {
      this.onLogOut()
      }
    }]
  });
  await actionSheet.present();
}


}
