import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  user:any;
  user_data:any;

  constructor( 
    private usuarioService: UsuarioService,
    private _auth:AuthService
     ) {
   }

   ngOnInit(){
    this.user = this._auth.getCurrentUser();
    this.user_data = this._auth.getCurrentUserData();
   }

  logout() {
    Swal.fire({
      title: "Atención",
      text:"¿Esta seguro de abandonar el sistema?",
      icon: "warning",
      showCancelButton: true, //
      confirmButtonColor: "#3085d6", // 
      cancelButtonColor: "#d33", // 
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.logout();
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }
}
