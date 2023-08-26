import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor( 
    private sidebarService: SidebarService,
    private _usuario:UsuarioService 
    ) {
    this.menuItems = sidebarService.menu;
    //console.log(this.menuItems)
  }

  ngOnInit(): void {
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
        this._usuario.logout();
      }
    })
  }
}
