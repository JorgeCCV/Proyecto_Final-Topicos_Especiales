import { Component, OnInit } from '@angular/core';
import {NavParams,ModalController} from '@ionic/angular';
import {message} from '../../models/message';
import {user} from '../../models/usuario';
import {ChatsService} from '../../servicios/chats.service';
import {AuthService} from '../../servicios/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  
  public name:any;
  public usuario:any;
  public nombre:string;
  public chat:any;

 //Creamos una variable tipo array donde se guardaran los mensajes 
  public mensajes =[];
  public msg:string;
//Creamos una variable donde se guardara el mensaje solo
 // public sms: message;
  public salaChat:any;
  constructor(private navparams : NavParams,
    private modal:ModalController,
    private chatservice:ChatsService,
    private auth:AuthService) { }

  ngOnInit() {
{
  //Aqui se recibe el chat
  this.chatservice.getChat(this.chat.id).subscribe(salaChat =>{
    console.log(salaChat);
    this.salaChat=salaChat;

  })
  this.chat = this.navparams.get('chat')
}
/*
{
//Aqui se recibe el nombre del usuario
this.auth.getUser(this.usuario.id).subscribe(nomb =>{
  console.log(nomb);
  this.name=nomb;

})
this.usuario = this.navparams.get('usuario')
  }
  */
  }

  cerrarChat(){

    this.modal.dismiss()
  }

  //Crearemos un metodo para enviar el mensaje
  enviarMensaje(){

    const mensaje :message = {
      content: this.msg,
      type:'text',
      date: new Date()
    }
    this.chatservice.enviarSmsAFirebase(mensaje,this.chat.id);
    this.msg="";

  /*
    const usua :user = {
     name:this.nombre,
     uid: 'text'
    
    }

    this.auth.enviarUsuario(usua,this.usuario.id);
    this.nombre="";
 */
    //this.mensajes.push(this.sms);

  }
}
