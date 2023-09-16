import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

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

    if(password.length < 8){
      Swal.fire('Información', 'La contraseña debe tener un mínimo de ocho caracteres', 'error');
      return;
    }

    if(password !== confirm){
      Swal.fire('Información', 'Las contraseñas no son iguales', 'error');
      return;
    }

    this._auth.createUser(dataSend).subscribe((res:any) =>{
      this._user.createUser({...dataUser, id_user:res.id}).subscribe(() =>{
        Swal.fire('Información', 'Se ha creado el usuario de manera exitosa', 'success').then(()=>{
            this.router.navigate(['/dashboard/roles']);
          }
        )
      })
    },
    (err)=>{
      if(!!err.error.error.details.codes.username){
        //duplicidad de usuarios
        Swal.fire('Mensaje de error', 'Ya existe un registro con el usuario ingresado', 'error');
        return;
      }
      if(!!err.error.error.details.codes.email){
        //duplicidad de email
        Swal.fire('Mensaje de error', 'Ya existe un registro con el correo ingresado', 'error');
        return;
      }
    })
  }

}
