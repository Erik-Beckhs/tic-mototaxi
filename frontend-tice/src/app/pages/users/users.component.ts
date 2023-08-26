import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usuario:any = {
    rol:'usuario',
    state:true,
    grado:'cabo'
  };
  gradosList = this._lists.grados;
  statesList = this._lists.states_user;
  rolesList = this._lists.roles_user;
  state_user = 'Nuevo';
  idUser:any;

  constructor(
    private _lists:ListsService,
    private activatedRoute:ActivatedRoute,
    private _auth:AuthService,
    private _user:UsuarioService,
    private router: Router
    ) { 
    this.idUser = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }

  submitUser(data:any){
    if(!this.validate(data)){
      return;
    }

    if(this.idUser == 0){
      this.createUser(data);
      //console.log(data);
    }
    else{
      console.log('editar')
    }
    
    //validar email
    //validar contraseña
    //registrar usuario principal
    //registrar usuario data
    //mensaje de creacion
  }

  validate(data:any){
    return true;
  }

  createUser(data:any){
    const {
      email,
      password,
      username,
      confirm,
      nombres,
      apellidos,
      grado,
      rol,
      state
    } = data;

    const dataSend = {
      email,
      password,
      username
    }

    const dataUser = {
      nombres,
      apellidos,
      grado,
      state,
      rol
    }

    this._auth.createUser(dataSend).subscribe((res:any) =>{
      this._user.createUser({...dataUser, id_user:res.id}).subscribe(() =>{
        swal('Información', 'Se creó el usuario de manera exitosa', 'success').then(()=>{
            this.router.navigate(['/dashboard/habilitar']);
          }
        )
      })
    })
  }

}
