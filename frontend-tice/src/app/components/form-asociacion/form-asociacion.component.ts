import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { ListsService } from 'src/app/services/lists.service';

import * as moment from 'moment';
import swal from 'sweetalert';

@Component({
  selector: 'app-form-asociacion',
  templateUrl: './form-asociacion.component.html',
  styleUrls: ['./form-asociacion.component.css']
})
export class FormAsociacionComponent implements OnInit {
  @Input() id: number;
  @Output() create = new EventEmitter<number>();
  
  imageTemp:any;
  imageLoad:boolean=false;
  edit_state:boolean=true;
  file:any;
  asociacion:any = {
    nombre:'',
    representante:'',
    direccion:'',
    ciudad:'',
    fcreacion:new Date(),
    personeria:'',
    img:''
  }
  ciudades:any = this._list.ciudades;

  constructor(
    private _asociacion:AsociacionService,
    private _list:ListsService
  ) { 
    
  }


  ngOnInit(): void {
    if(this.id != 0){
      this.loadAsociacion();
      this.edit_state = false;
    }
  }

  //methods
  onSubmit(item:any){

    if(this.imageTemp){
      item.img = this.imageTemp;
    }

    if(this.id !== 0){
      this.update(item);
    }  
    else{
      this.createAsociacion(item);
    }
  }

  update(item:any){
    this._asociacion.updateAsociacion(this.id, item).subscribe((res:any)=>{
      this.id = res.id;
      swal('Información', `Se modificó el registro de manera exitosa`, 'success');
      this.loadAsociacion();
    })
  }

  createAsociacion(item:any){
    this._asociacion.saveAsoc(item).subscribe((res:any)=>{
      //this.asociacion.id = res.id;
      this.id = res.id;
      this.create.emit(this.id);
      this.loadAsociacion();
      swal("Información", "Se registró la asociación de manera correcta", "success");
    }) 
  }

  loadAsociacion(){
    this.edit_state = false;

    this._asociacion.getAsociacionById(this.id).subscribe((res)=>{
      this.asociacion = res;
      this.asociacion.fcreacion = moment(this.asociacion.fcreacion).format('YYYY-MM-DD');
      if(this.asociacion.img){
        this.imageTemp = this.asociacion.img;
      }
    })
  }

  onFileChange(event:any) {
    this.file=event.target.files[0]
    if(!event){
      this.file = null
      return ;
    }

    if(this.file.type.indexOf('image')<0){
      swal("Información", "Sólo puede elegir archivos de tipo imagen", "error")
      this.file=null
      return ;
    }

    this.imageLoad=this.file

    let reader = new FileReader()
    let urlImagenTemp = reader.readAsDataURL(this.file)
    reader.onloadend = ()=>{
      //console.log(reader.result)
      this.imageTemp = reader.result
    }
  }

  limpiar(){
    this.asociacion = {
      nombre:'',
      representante:'',
      direccion:'',
      ciudad:'',
      fcreacion:'',
      img:''
    }
  }
}
