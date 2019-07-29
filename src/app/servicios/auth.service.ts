import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {user} from '../models/usuario';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {firestore} from 'firebase';

export interface  usuario {
  id:string
  name:string
  uid:string;
 }

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private AngFireAuth:AngularFireAuth , private router: Router,private db:AngularFirestore) { }

//Primer Metodo
 login(email:string,pass:string){

  //Configuramos un regreso de una promesa

return new Promise((resolve,rejected) =>{
//Accedemos a todas la funciones que nos da Firebase 
this.AngFireAuth.auth.signInWithEmailAndPassword(email,pass)

//Si la promesa es correcta nos devolvera una solucion o caso contrario la rechaza

.then(user =>{resolve(user)})
.catch(err =>rejected(err));

  });
 }

logout(){

  this.AngFireAuth.auth.signOut().then(() =>{
this.router.navigate(['login']);

  })
}
//Funcion para registrar un nuevo usuario

registrarse(email: string,pass:string,name:string){
return new Promise((resolve,reject)=>{

this.AngFireAuth.auth.createUserWithEmailAndPassword(email,pass).then(res =>{
  // console.log(res.user.uid)
 const uid =res.user.uid;
  this.db.collection('users').doc(res.user.uid).set({
    name:name,
    uid :uid

  })

resolve(res)
}).catch(err=>reject(err))

})
}
/*
getUsers(){
  //Regresa una coleccion de datos de Firebase
 return this.db.collection('users').snapshotChanges().pipe(map(usuarios=> {

return usuarios.map(b=> {

  const data2 =b.payload.doc.data() as usuario ;
  data2.id = b.payload.doc.id;
  return data2;
    })
 }))
}
*/

getUser(user_id:string){

 return this.db.collection('users').doc(user_id).valueChanges()

}

enviarUsuario(usua:user,user_id:string){
  //apuntar a al BDD
this.db.collection('users').doc(user_id).update({
  //actualiza el campo messages y lo une con el arreglo
messages: firestore.FieldValue.arrayUnion(usua),

})

}
}