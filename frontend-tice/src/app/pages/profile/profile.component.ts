import { Component, OnInit } from '@angular/core';
//services
import { UsuarioService } from 'src/app/services/usuario.service';
import { ListsService } from 'src/app/services/lists.service';
import swal from 'sweetalert';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageLoad:boolean=true;
  imageTemp:any;
  file:any;
  id_user:any = '';
  id:any = ''; //id de usuario data
  usuario:any = {};
  gradosList = this._lists.grados;

  constructor(
    private _usuario:UsuarioService,
    private _lists:ListsService,
    private _auth:AuthService
    ) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser(): void {
    this._usuario.getUserData().subscribe((res:any)=>{
      this.usuario = res;
      this.id_user = res.id_user;
      this.id = res.id;
    })
  }

  confirmUpdate(user:any){
    swal({
      title: "Advertencia",
      text:"¿Esta seguro de cambiar la información?",
      icon: "info",
      buttons: ['NO', 'SI'],
      dangerMode: true,
    }).then((respuesta:boolean)=>{
      if(respuesta){
        this.updateUserData(user);
      }
    })
  }

  updateUserData(user:any){
    this._usuario.updateUserData(this.id, user).subscribe((res:any)=>{
      //console.log(res);
      this.updateUserPrincipal(user); //modificamos el username y el email
    })
  }

  updateUserPrincipal(data:any){
    const dataSend = {email:data.email, username:data.username}
    this._auth.updateUser(this.id_user, dataSend).subscribe(()=>{
      swal('Información', 'Se modificó la información de forma exitosa', 'success');
      this.updateHeader(dataSend)
    })
  }

  updateHeader(data:any){
    const {username, email} = data
    const user = this._auth.getCurrentUser();
    user.user.username = username;
    user.user.email = email
    this._auth.setUser(user);
    location.reload();
  }
  
  updateImage(){
    // let file:object={
    //   img:this.imageTemp
    // };
    // let idContact:any = this.contact.id;
    // this._contact.updateImage(file, idContact);
    // .subscribe(res=>{
    //   this._contact.getSupplierAssocContact(this.contact.id).subscribe((resp)=>
    //   {
    //     //console.log(resp)
    //     this._contact.setContact(resp);
    //     this._contact.notificacion.emit =  resp;
    //     //console.log('Datos actualizados');
    //     //refrescar la pagina
    //       this.router.navigateByUrl('/cot-principal', { skipLocationChange: true }).then(() => {
    //       this.router.navigate(['/pages/profile']);
    //     }); 
    //   }
    // )
    // })
  }

  onFileChange(event:any) {
    this.file=event.target.files[0];
    if(!event){
      this.file = null
      return ;
    }

    if(this.file.type.indexOf('image')<0){
      //swal("HANSA Business", "Sólo puede elegir archivos de tipo imagen", "error");
      alert("Solo puede elegir archivos de tipo imagen");
      this.file=null;
      return ;
    }

    this.imageLoad=this.file;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(this.file);
    reader.onloadend = ()=>{
      //console.log(reader.result)
      this.imageTemp = reader.result;
    }
  }

}
