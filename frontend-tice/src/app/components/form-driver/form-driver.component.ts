import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { ListsService } from 'src/app/services/lists.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchComponent } from 'src/app/dialogs/dialog-search/dialog-search.component';
import { ExternalService } from 'src/app/services/external.service';

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
    ci:'',
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
  loading:boolean=false;

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
    private _driver:ConductorService,
    public dialog: MatDialog,
    private _external:ExternalService,
    private router:Router
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

    // if(!item.fotografia){
    //   swal('Información', 'Debe cargar una imagen', 'error');
    //   return;
    // }

    if(this.id !== 0){
      this.update(item);
    }  
    else{
      this.save(item); //primero se genera el codigo y luego se guarda
    }
  }

  update(item:any){
    this._driver.update(this.id, item).subscribe((res:any)=>{
      this.id = res.id;
      this.create.emit(this.id);
      this.loadDriver();
      Swal.fire('Información', `Se modificó el registro de manera exitosa`, 'success').then(()=>{
        this.edit_state = false;
      })
    })
  }
  
  async save(item:any){

    this._driver.save({...item, fecha_registro:new Date().toISOString()}).subscribe((res:any)=>{
      this.id = res.id;
      this.create.emit(this.id);
      this.loadDriver();
      Swal.fire("Información", "Se registró al conductor de manera exitosa", "success").then(()=>{
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
      Swal.fire("Información","Solo puede elegir archivos de tipo imagen", "warning");
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
      //this.conductor.fecha_nac = moment(this.conductor.fecha_nac).format('YYYY-MM-DD');
      this.conductor.fecha_registro = moment(this.conductor.fecha_registro).format('DD/MM/YYYY');
      //console.log(this.conductor)
      if(!!this.conductor.fotografia) this.imageTemp = this.conductor.fotografia;
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

  openDialog(){
    const dialogRef = this.dialog.open(DialogSearchComponent, {
      data: {title: 'Ingrese el Nro. de cédula sin extensión ni complemento', value: ''},
      width:'400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        this.loading = false;
        return;
      }
      
      const cedula = result;
      this.loading = true
      this._driver.getDriverByCi(cedula).subscribe((res:any)=>{
        //console.log(res);
        if(res.length > 0){
          Swal.fire('Importante', 'El conductor ya se encuentra registrado en el sistema', 'info');
          this.loading = false;
        }
        else{
          //console.log('buscamos en segip')
          this.searchExternal(cedula);
        }
      })
    });
  }

  searchExternal(value:any){
    const response = this._external.getDriverExternal(value);
    if(!!response){
      this.assignSinceSegip(response);
    }
    else{
      Swal.fire('Información', 'No se encontró el registro', 'info');
    }
    //console.log(response);
    this.loading = false;
  }

  refreshSEGIP(){
    this.loading = true;
    this.searchExternal(this.conductor.ci);
  }

  assignSinceSegip(data:any){
    this.conductor.nombres=data.Nombres;
      this.conductor.paterno=data.PrimerApellido;
      this.conductor.materno=data.SegundoApellido;
      this.conductor.ci=data.NumeroDocumento;
      this.conductor.complemento=data.Complemento;
      this.conductor.fotografia=data.Fotografia;
      this.conductor.genero=data.Genero;
      this.conductor.fecha_nac=data.FechaNacimiento;
      this.conductor.direccion=data.Domicilio;
      this.imageTemp = data.Fotografia;
  }

  confirm_delete(){
      Swal.fire({
        title: "Información",
        text: `¿Esta seguro que desea eliminar el registro? Se eliminará toda la información relacionada con el conductor`,
        icon: "warning",
        showCancelButton: true, //
        confirmButtonColor: "#3085d6", // 
        cancelButtonColor: "#d33", // 
        confirmButtonText: "SI",
        cancelButtonText: "NO",
      }).then((result) => {
        if (result.isConfirmed) {
          this.delete();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          return;
        }
      });
  }

  delete(){
    this._driver.deleteConductor(this.id).subscribe(()=>{
      Swal.fire('Información', 'Se eliminó al conductor de manera exitosa', 'success').then(()=>{
        this.router.navigate(['/dashboard/drivers']);
      })
    })
  }
}


interface DriverData {
  nombres:string,
  paterno:string,
  materno:string,
  ci:string,
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
