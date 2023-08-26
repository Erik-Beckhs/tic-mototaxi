import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

import swal from 'sweetalert';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  user:any;

  constructor( 
    private usuarioService: UsuarioService,
    private _auth:AuthService
     ) {
    // this.user = this.auth.getCurrentUser();
    this.user = this._auth.getCurrentUser();
    //console.log(this.user);
   }

  logout() {
    swal({
      title: "Atención",
      text:"¿Esta seguro de abandonar el sistema?",
      icon: "info",
      buttons: ['NO', 'SI'],
      dangerMode: true,
    }).then((respuesta:boolean)=>{
      if(respuesta){
        this.usuarioService.logout();
      }
    })
  }
}
