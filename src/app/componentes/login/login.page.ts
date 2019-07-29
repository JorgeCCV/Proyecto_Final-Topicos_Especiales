import { Component, OnInit } from '@angular/core';

//importamos la clase y el servicio
import {AuthService} from '../../servicios/auth.service';

//Router nos permite navegar entre paginas
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Creamos dos variables
  email:string;
  pass:string;

  constructor(private authService:AuthService,public router:Router) { }

  ngOnInit() {
  }
  //Funcion que tomara el boton "Ingresar"
  
onSubmitLogin(){

  //Aqui confirmamos si la respuesta es positiva para redirigir
  // a otra pagina

this.authService.login(this.email,this.pass).then(res =>{

this.router.navigate(['/home']);
}).catch(err => alert('Datos Incorrectos o Usuario no existe '));

}
}
