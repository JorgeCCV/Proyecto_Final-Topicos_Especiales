import { Component, OnInit } from '@angular/core';
//Importamos el servicio
import {AuthService} from '../../servicios/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

//Variables que seran tomadas para el registro
  public email:string;
  public pass: string;
  public name: string;

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
  }
//Metodo para el boton de registro

onSubmitRegister(){
this.auth.registrarse(this.email,this.pass,this.name).then(auth =>{
  this.router.navigate(["home"])
  console.log(auth)
}).catch(err=> console.log(err))

}

}
