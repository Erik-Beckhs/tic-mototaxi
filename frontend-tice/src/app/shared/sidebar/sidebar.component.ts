import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';
import Swal from 'sweetalert2';

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
        this._usuario.logout();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }
}
