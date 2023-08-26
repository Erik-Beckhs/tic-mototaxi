import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert';



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
    if(data.new.length >= 8 && data.old.length >= 8 && data.old.length >= 8){
      if(data.new != data.confirm){
        swal('Mensaje de Error', 'Las contraseñas nuevas no son iguales', 'error');
        return;
      }
      else{
        this._auth.changePassword(data.old, data.new).subscribe(() =>{

          swal('Información', 'La contraseña ha sido cambiada con éxito, debe volver a iniciar sesión', 'success');
          this._auth.logout();
          setTimeout(()=>{
            location.reload();
          },3000)

        }, (err) => {
          console.log(err)
          swal("Mensaje de Error", "La contraseña actual no es correcta", "error");
        })
      }
    }
    else{
      swal('Mensaje de Error', 'La longitud mínima de contraseña es de 8 caracteres', 'error');
      return;
    }
  }
}