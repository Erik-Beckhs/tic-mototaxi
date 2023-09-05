import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { MatDialog } from '@angular/material/dialog';
import { TableOwnersComponent } from '../table-owners/table-owners.component';
import { FormOwnerComponent } from '../form-owner/form-owner.component';
//import { TableVehiclesComponent } from '../table-vehicles/table-vehicles.component';
import { DialogVehicleComponent } from '../../dialogs/dialog-vehicle/dialog-vehicle.component';

import swal from 'sweetalert';


@Component({
  selector: 'app-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
})
export class FormVehicleComponent implements OnInit {
  @Input() parentId: number;
  //@Input() id: number;
  @Output() update = new EventEmitter<any>();
  
  vehicle:any={
    placa:'',
    tipo:''
  }

  id:number = 0;
  aux_id:number = 0;

  paisList:string[]=[];
  colorsList:string[]=[];
  tservicesList:string[]=[];
  edit_state:boolean=true;
  file:any;
  imageLoad:boolean=true;
  imageTemp:any;

  constructor(
    private _list:ListsService,
    private _vehicle: VehiculoService,
    public dialog: MatDialog
    ) { 
    this.paisList = this._list.pais.sort();
    this.colorsList = this._list.colores;
    this.tservicesList=this._list.tservicios; 
  }

  ngOnInit(): void {
    //console.log(this.id);
    if(!!this.parentId){
      //buscar el vehiculo por campo padre
      this.loadVehicleByDriverId();
      this.edit_state = false;
    }
    else{
      this.edit_state = true;
      //console.log('el conductor no tiene vehiculo')
    }
  }

  loadVehicle(){
    this._vehicle.getVehicle(this.id).subscribe((res:any)=>{
      this.vehicle = res;
      //console.log(res);
    })
  }

  loadVehicleByDriverId(){
    this._vehicle.getVehicleByDriverId(this.parentId).subscribe((res:any)=>{
      this.vehicle = res[0];
      this.id = this.vehicle.id;
      // console.log(res);
    })
  }

  //methods
  onSubmit(item:any){
    if(this.imageTemp){
      item.img = this.imageTemp;
    }
    if(!item.img){
      swal('Información', 'Debe cargar una imagen', 'error');
      return;
    }

    if(this.id !== 0){
      if(this.id !== this.aux_id && this.aux_id !== 0){
        this._vehicle.update(this.aux_id, {id_conductor:''})
        item.id_conductor = this.id;
      }
      this.updateVehicle(item);
      this.edit_state = false;
    }  
    else{
      item.id_conductor = this.parentId;
      this.generateCodeVehicle(item); 
    }

  }

  updateVehicle(body:any){
    //console.log(body);
    this._vehicle.update(this.id, body).subscribe((res:any)=>{
      swal('Información', 'Se actualizó el registro de manera correcta', 'success').then(()=>{
        this.loadVehicle();
        this.update.emit();
      })
    })
    return;
  }

  async generateCodeVehicle(item:any){
    //console.log(item);
    this._vehicle.getLastId().subscribe((data:any)=>{
      let val = parseInt(data.id) + 1;
      let code = ('0000' + val).slice(-5);
      const new_code = `VDTSC-${code}/${new Date().getFullYear()}`;
      item.codigo = new_code;
    
      this.save(item);
    })
  }

  save(body:any){
    //console.log(body)
    this._vehicle.guardarVehiculo(body).subscribe((res:any)=>{
      this.id = res.id;
      this.update.emit();
      this.loadVehicle();
      swal('Información', 'Se guardó el vehiculo de manera exitosa', 'success');
    })
  }

  onFileChange(event:any) {
    this.file = event.target.files[0];
    if(!event){
      this.file = null
      return ;
    }

    if(this.file.type.indexOf('image')<0){
      //swal("HANSA Business", "Sólo puede elegir archivos de tipo imagen", "error");
      swal("Información","Solo puede elegir archivos de tipo imagen", "warning");
      this.file=null;
      return ;
    }

    this.imageLoad = this.file;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(this.file);
    reader.onloadend = ()=>{
      //console.log(reader.result)
      this.imageTemp = reader.result;
      this.vehicle.img = this.imageTemp;
    }
  }

  openDialogOwner(){
    //console.log('se abre el modal')
    const dialogRef = this.dialog.open(TableOwnersComponent, {
      width: '600px',
      //data: this.id
    });
  }
  openDialogCreateOwner(){
    //console.log('se abre el modal')
    const dialogRef = this.dialog.open(FormOwnerComponent, {
      width: '600px',
      //data: this.id
    });
  }

  openDialogVehicleList(){
    // const dialogRef = this.dialog.open(TableVehiclesComponent, {
    //   width: '900px',
    //   data: {
    //     id:this.id,
    //     module:'vehicle'
    //   }
    // });
      if(!!this.id){

      }
      

      const dialogRef = this.dialog.open(DialogVehicleComponent, {
      width: '900px',
      data: {
        id:this.id,
        module:'vehicle'
      }
    });
    
    dialogRef.componentInstance.dataSend.subscribe((data:any) => {
      this.vehicle = data;
      this.aux_id = this.id
      this.id = data.id;
      console.log('antiguo'+this.aux_id);
      console.log('nuevo'+this.id);
      //console.log(this.vehicle);
      this.edit_state = true;
    });
  }
}
