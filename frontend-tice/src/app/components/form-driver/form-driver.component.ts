import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { ListsService } from 'src/app/services/lists.service';

import swal from 'sweetalert';
import * as moment from 'moment';

@Component({
  selector: 'app-form-driver',
  templateUrl: './form-driver.component.html',
  styleUrls: ['./form-driver.component.css']
})
export class FormDriverComponent implements OnInit {
  @Input() id: number;
  @Input() vehicleId: number;
  @Output() create = new EventEmitter<number>();

  edit_state:boolean = true;
  conductor:DriverData={
    nombres:'',
    paterno:'',
    materno:'',
    ci:0,
    expedicion:'',
    complemento:'',
    tipo_sangre:'',
    id_asociacion:0,
    cat_licencia:'',
    fotografia:'',
    genero:'',
    codigo:'',
    fecha_nac:'',
    direccion:'',
    licencia:'',
    fecha_registro:moment(new Date()).format('DD/MM/YYYY')
  };
  conductor_aux:any;

  expedicionesList:any;
  tiposangreList:any;
  generosList:any;
  sindicatosList:any;
  categoriasList:string[];

  file:any;
  imageLoad:boolean=true;
  imageTemp:any;

  constructor(
    private _list:ListsService,
    private _sindicato:AsociacionService,
    private _driver:ConductorService
    ) {
    this.loadSindicatos();

    this.expedicionesList=this._list.expediciones;
    this.tiposangreList = this._list.tsangre;
    this.generosList = this._list.generos;
    this.categoriasList = this._list.categorias;
  }
    
  ngOnInit(): void {
    if(this.id != 0){
      this.loadDriver();
      this.edit_state = false;
    }
  }

  //methods

  onSubmit(item:any){

    if(this.imageTemp){
      item.fotografia = this.imageTemp;
    }
    if(!item.fotografia){
      swal('Información', 'Debe cargar una imagen', 'error');
      return;
    }

    if(this.id !== 0){
      this.update(item);
    }  
    else{
      this.generateCodeDriver(item); //primero se genera el codigo y luego se guarda
    }

  }

  update(item:any){
    this._driver.update(this.id, item).subscribe((res:any)=>{
      this.id = res.id;
      this.create.emit(this.id);
      this.loadDriver();
      swal('Información', `Se modificó el registro de manera exitosa`, 'success').then(()=>{
        this.edit_state = false;
        
      })
    })
  }
  
  async save(item:any){
    // await this.generateCodeDriver();

    this._driver.save({...item, fecha_registro:new Date().toISOString()}).subscribe((res:any)=>{
      this.id = res.id;
      this.create.emit(this.id);
      this.loadDriver();
      swal("Información", "Se registró el conductor de manera correcta", "success").then(()=>{
        this.edit_state = false;
      })
    }) 
  }

  loadSindicatos(){
    this._sindicato.getAsociaciones().subscribe((res:any)=>{
      this.sindicatosList = res;
    })
  }

  onFileChange(event:any) {
    this.file=event.target.files[0];
    if(!event){
      this.file = null
      return ;
    }

    if(this.file.type.indexOf('image') < 0){
      swal("Información","Solo puede elegir archivos de tipo imagen", "warning");
      this.file=null;
      return ;
    }

    this.imageLoad=this.file;

    let reader = new FileReader();
    let urlImagenTempUser = reader.readAsDataURL(this.file);
    reader.onloadend = ()=>{
      this.imageTemp = reader.result;

      this.conductor.fotografia = this.imageTemp;
    }
  }

  loadDriver(){
    this._driver.getConductorById(this.id).subscribe((res:any)=>{
      this.conductor = res;
      this.conductor_aux = {...this.conductor}
      this.conductor.fecha_nac = moment(this.conductor.fecha_nac).format('YYYY-MM-DD');
      this.conductor.fecha_registro = moment(this.conductor.fecha_registro).format('DD/MM/YYYY');
      //console.log(this.conductor)
      if(!!this.conductor.fotografia) this.imageTemp = this.conductor.fotografia;
    })
  }

  async generateCodeDriver(item:any){
    this._driver.getLastID().subscribe((data:any)=>{
      let val = parseInt(data.id) + 1;
      let code = ('0000' + val).slice(-5);
      const new_code = `CDT-${code}/${new Date().getFullYear()}`;
      item.codigo = new_code;
    
      this.save(item);
    })
  }

  changeState(value:number){
    if(value==0){
      this.restart()
      this.edit_state = false;
      
    }
    else if(value == 1){
      this.edit_state = true;
    }
  }

  restart(){
    this.conductor = {...this.conductor_aux}
  }
}


interface DriverData {
  nombres:string,
  paterno:string,
  materno:string,
  ci:number,
  complemento:string,
  expedicion:string,
  tipo_sangre:string,
  id_asociacion:number,
  cat_licencia:string,
  fotografia:string,
  genero:string,
  codigo:string,
  fecha_nac:string,
  direccion:string,
  licencia:string,
  fecha_registro:string,
}
