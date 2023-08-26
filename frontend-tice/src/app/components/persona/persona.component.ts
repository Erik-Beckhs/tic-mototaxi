import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  imageLoad:boolean=true;
  imageTemp:any;
  file:any;

  expediciones:any;

  conductor:ConductorInterface = {
    ci : 8286974
  };


  constructor(public _list:ListsService) { }

  ngOnInit(): void {
    this.expediciones = this._list.expediciones;
  }


  updateImage(){

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

export class ConductorInterface {
  ci?:number;
  lugar?:string;
  nombre?:string;
  apellidos?:string;
  fnac?:any;
  tsangre?:string;
  nacionalidad?:string;
  direccion?:string;
  img?:string;
}
