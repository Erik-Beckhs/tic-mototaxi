import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password:any={
    old:'',
    new:'',
    confirm:'',
  }

  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
  }

  change(data:any){
    if(data.new.length >= 8){
      if(data.new != data.confirm){
        Swal.fire('Mensaje de Error', 'Las contraseñas nuevas no son iguales', 'error');
        return;
      }
      else{
        this._auth.changePassword(data.old, data.new).subscribe(() =>{

          Swal.fire('Información', 'La contraseña ha sido cambiada con éxito, debe volver a iniciar sesión', 'success');
          this._auth.logout();
          setTimeout(()=>{
            location.reload();
          },3000)

        }, (err) => {
          console.log(err)
          Swal.fire("Mensaje de Error", "La contraseña actual no es correcta", "error");
        })
      }
    }
    else{
      Swal.fire('Mensaje de Error', 'La contraseña nueva debe tener un mínimo de ocho caracteres', 'error');
      return;
    }
  }
}