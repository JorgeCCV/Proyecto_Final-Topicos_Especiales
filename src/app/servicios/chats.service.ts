import { Injectable } from '@angular/core';
//Importar libreria Firestore
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {message} from '../models/message';
import {firestore} from 'firebase';
import {AuthService} from '../servicios/auth.service';


//Un modelo de interfaz para el tipo chat
export interface  chat {
  id:string
  name:string
  description: string
  Image:string
 }
 

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private db:AngularFirestore) { }

getChatRoom(){
  //Regresa una coleccion de datos de Firebase
 return this.db.collection('chatsRoom').snapshotChanges().pipe(map(salasChat=> {

return salasChat.map(a=> {

  const data =a.payload.doc.data() as chat ;
  data.id = a.payload.doc.id;
  return data;
    })
 }))
}

getChat(chat_id:string){

  return this.db.collection('chatsRoom').doc(chat_id).valueChanges()
}

enviarSmsAFirebase(message:message,chat_id:string){
  //apuntar a al BDD
this.db.collection('chatsRoom').doc(chat_id).update({
  //actualiza el campo messages y lo une con el arreglo
messages: firestore.FieldValue.arrayUnion(message),

})

}


}
