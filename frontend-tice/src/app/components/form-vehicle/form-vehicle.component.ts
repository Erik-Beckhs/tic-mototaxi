import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ExternalService } from 'src/app/services/external.service';
import { MatDialog } from '@angular/material/dialog';
//import { TableOwnersComponent } from '../table-owners/table-owners.component';
//import { FormOwnerComponent } from '../form-owner/form-owner.component';
//import { TableVehiclesComponent } from '../table-vehicles/table-vehicles.component';
//import { DialogVehicleComponent } from '../../dialogs/dialog-vehicle/dialog-vehicle.component';
//import { DialogListOwnerComponent } from 'src/app/dialogs/dialog-list-owner/dialog-list-owner.component';
import { DialogSearchComponent } from 'src/app/dialogs/dialog-search/dialog-search.component';
import Swal from 'sweetalert2';
import moment from 'moment';

@Component({
  selector: 'app-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
})
export class FormVehicleComponent implements OnInit {
  @Input() parentId: number;
  //@Input() id: number;
  @Output() update = new EventEmitter<any>();
  
  vehicle:VehicleData={
    id:0,
    placa:'',
    industria:'',
    marca:'',
    modelo:'',
    clase:'',
    tvehiculo:'',
    chasis:'',
    color:'',
    cilindrada:'',
    radicatoria:'',
    itv:'',
    tipo:'',
    img:'',
    soat:0,
    fecha_inicio_soat:'',
    fecha_fin_soat:'',
    propietario:'',
    ci_propietario:'',
    img_propietario:''
  }

  vehicle_aux:any;
  vigency:number = 0

  id:number = 0;
  aux_id:number = 0;
  loading:boolean=false;
  loading_soat:boolean=false;

  paisList:string[]=[];
  colorsList:string[]=[];
  tservicesList:string[]=[];
  departamentosList:any[] = [];
  edit_state:boolean=false;
  file:any;
  imageLoad:boolean=true;
  imageTemp:any;

  constructor(
    private _list:ListsService,
    private _vehicle: VehiculoService,
    private _external:ExternalService,
    public dialog: MatDialog
    ) { 
    this.paisList = this._list.pais.sort();
    this.colorsList = this._list.colores;
    this.tservicesList=this._list.tservicios; 
    this.departamentosList = this._list.departamentos;
  }

  ngOnInit(): void {
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
      if(res.length > 0){
        this.vehicle = res[0];
        this.vehicle_aux = {...this.vehicle}
        this.id = this.vehicle.id;
        this.data_soat(this.vehicle.fecha_inicio_soat, this.vehicle.fecha_fin_soat);
      }
    })
  }

  //methods
  onSubmit(item:any){
    if(!!this.imageTemp){
      item.img = this.imageTemp;
    }
    item.img_propietario = this.vehicle.img_propietario;
    item.soat = this.vehicle.soat;
    item.fecha_inicio_soat = this.vehicle.fecha_inicio_soat;
    item.fecha_fin_soat = this.vehicle.fecha_fin_soat;
    // if(!item.img){
    //   swal('Información', 'Debe cargar una imagen', 'error');
    //   return;
    // }

    //const current_year = new Date().getFullYear();

    // if(this.vehicle.itv.substring(0,4) == current_year  && this.vigency == 1){ //validacion de itv y soat
    if(this.vigency == 1){ //reemplazar por este
      if(this.id !== 0){
        //editar
        if(this.id !== this.aux_id && this.aux_id !== 0){
          this._vehicle.update(this.aux_id, {id_conductor:''})
          item.id_conductor = this.id;
        }
        this.updateVehicle(item);
        this.edit_state = false;
      }  
      else{
        //crear
        item.id_conductor = this.parentId;
        this.save(item); 
      }
      this.edit_state = false;
    }   
    else{
      Swal.fire("Información", "No se puede registrar debido a que los valores de ITV o SOAT no se encuentran vigentes", "error");
    }
  }

  updateVehicle(body:any){
    //console.log(body);
    this._vehicle.update(this.id, body).subscribe((res:any)=>{
      Swal.fire('Información', 'Se actualizó el registro de manera correcta', 'success').then(()=>{
        this.loadVehicle();
        this.update.emit();
      })
    })
    return;
  }


  save(body:any){
    this._vehicle.guardarVehiculo(body).subscribe((res:any)=>{
      this.id = res.id;
      this.update.emit();
      this.loadVehicle();
      Swal.fire('Información', 'Se guardó el vehiculo de manera exitosa', 'success');
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
      Swal.fire("Información","Solo puede elegir archivos de tipo imagen", "warning");
      this.file=null;
      return ;
    }

    //this.imageLoad = this.file;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(this.file);
    reader.onloadend = ()=>{
      //console.log(reader.result)
      this.imageTemp = reader.result;
      this.vehicle.img = this.imageTemp;
    }
  }

  // openDialogOwner(){
  //   //console.log('se abre el modal')
  //   const dialogRef = this.dialog.open(DialogListOwnerComponent, {
  //     width: '1100px',
  //     data: {
  //       id:this.id,
  //       module:'vehicle'
  //     }
  //   });

  //   dialogRef.componentInstance.dataSend.subscribe((data:any) => {
  //     //console.log(data);
  //     this.vehicle.id_propietario = data.id;
  //     this.vehicle.propietario = `${data.nombres} ${data.apellidos}`;
  //     // this.aux_id = this.id;
  //     // this.id = data.id;
  //     // console.log('antiguo'+this.aux_id);
  //     // console.log('nuevo'+this.id);
  //     // //console.log(this.vehicle);
  //     // this.edit_state = true;
  //   });
  // }
  // openDialogCreateOwner(){
  //   //console.log('se abre el modal')
  //   const dialogRef = this.dialog.open(FormOwnerComponent, {
  //     width: '900px',
  //     //data: this.id
  //   });
  // }

  // openDialogVehicleList(){
  //   // const dialogRef = this.dialog.open(TableVehiclesComponent, {
  //   //   width: '900px',
  //   //   data: {
  //   //     id:this.id,
  //   //     module:'vehicle'
  //   //   }
  //   // });
  //     if(!!this.id){

  //     }
      
  //     const dialogRef = this.dialog.open(DialogVehicleComponent, {
  //     width: '900px',
  //     data: {
  //       id:this.id,
  //       module:'vehicle'
  //     }
  //   });
    
  //   dialogRef.componentInstance.dataSend.subscribe((data:any) => {
  //     this.vehicle = data;
  //     this.vehicle_aux = {...data}
  //     this.aux_id = this.id
  //     this.id = data.id;
  //     console.log('antiguo'+this.aux_id);
  //     console.log('nuevo'+this.id);
  //     //console.log(this.vehicle);
  //     this.edit_state = true;
  //   });
  // }
  openDialogVehicleSearch(){
    const dialogRef = this.dialog.open(DialogSearchComponent, {
      data: {title: 'Ingrese el Nro. de placa Ej. 1234ABC', value: ''},
      width:'400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        this.loading = false;
        return;
      }
      const placa = result;
      this.loading = true;
      this._vehicle.getVehicleByPlaca(placa).subscribe((res:any)=>{
      this.vigency = 0; //ocultamos la informacion del soat

        if(res.length > 0){
          //console.log(res);
          const vehiculo = res[0];

          if(!!vehiculo.id_conductor){
            const {nombres, paterno} = vehiculo.conductor;
            Swal.fire({
              title: "Información",
              text: `El vehiculo ya fue registrado y el conductor asignado es: ${nombres} ${paterno}, ¿Desea utilizar este vehículo?`,
              icon: "warning",
              showCancelButton: true, //
              confirmButtonColor: "#3085d6", // 
              cancelButtonColor: "#d33", // 
              confirmButtonText: "Aceptar",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                // asignar al registro actual
                this.vehicle = vehiculo;
                this.imageTemp = this.vehicle.img; 
                this.edit_state = true;
                this.loading = false;
                //ojo cambiara el id conductor de vehiculo al momento de registrar
                //console.log('asignarlo aqui')
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // no hacer nada
                //console.log('no hacer nada')
                this.loading = false;
                return;
              }
            });
          }
          else{
            this.vehicle = vehiculo;
             this.imageTemp = this.vehicle.img; 
            this.edit_state = true;
            this.loading = false;
          }
                     
        }
        else{
          console.log('iniciando busqueda en bd itv')
          this.getExternalVehicle(placa);
        }
        //this.loading=false;
      })
    });
  }

  getExternalVehicle(placa:string){
    //console.log('buscar la placa en la base de datos externa', placa)
    this._external.getVehicleExternal(placa).subscribe((res:any)=>{
      // console.log(res);
      // return;

      if(res.status == 200){
        this.assignVehicle(res);
        this.edit_state = true;
        this.loading = false;
      }
      else if(res.status == 610){
        Swal.fire('Información', res.mensaje, 'info' );
        this.loading = false;
      }
      else{
        Swal.fire('Información', 'Ocurrió un error en la peticion','error')
        //puede que no haya sistema
      }
    }),
    ((err) => {
      Swal.fire('Información', 'La placa consultada, no corresponde a un vehículo existente', 'info' );
      //puede que no haya sistema
    });
  }

  async assignVehicle(data:any){
    const {datos_tecnicos} = data;

    this.vehicle.placa=datos_tecnicos.placa;
    this.vehicle.industria=datos_tecnicos.industria;
    this.vehicle.marca=datos_tecnicos.marca;
    this.vehicle.modelo=datos_tecnicos.modelo;
    this.vehicle.clase=datos_tecnicos.clase;
    this.vehicle.tvehiculo=datos_tecnicos.tipo_vehiculo;
    this.vehicle.chasis=datos_tecnicos.chasis;
    this.vehicle.color=datos_tecnicos.color;
    this.vehicle.cilindrada=datos_tecnicos.cilindrada;
    this.vehicle.radicatoria=datos_tecnicos.radicatoria;
    this.vehicle.img=`data:image/png;base64,${datos_tecnicos.fotografia}`;

    this.imageTemp = this.vehicle.img;

    if(!!data.personas){
      const propietario = data.personas[0];

      this.vehicle.itv=propietario.gestion;
      this.vehicle.propietario=`${propietario.nombre} ${propietario.paterno} ${propietario.materno}`;
      this.vehicle.ci_propietario=`${propietario.nro_documento} ${propietario.documento_complemento || ''} ${this.formatExpedicion(propietario.expedicion)}`;
      this.vehicle.img_propietario=`data:image/png;base64,${propietario.fotografia}`;
    }
  }

  formatExpedicion(value:string){
    const aux = this._list.departamentos.find(el=>(el.label == value))
    return aux.value;
  }

  changeState(value:number){
    if(value == 0){
      this.restart();
      this.edit_state = false
    }
    else if(value == 1){
      this.edit_state = true
    }
  }

  restart(){
    this.vehicle = {...this.vehicle_aux}
  }

  verify_soat(){
    //console.log(moment('2023-12-31').format('DD/MM/YYYY'))

    this.loading_soat = true;
    setTimeout(()=>{
      const data = this._external.getSOAT(this.vehicle.placa);
      if(!!data){
        const fecha_ini = data.oSDatos.SoatFechaCoberturaInicio.substring(0,10)
        const fecha_fin = data.oSDatos.SoatFechaCoberturaFin.substring(0,10)

        this.vehicle.fecha_inicio_soat = moment(fecha_ini).format('DD/MM/YYYY');
        this.vehicle.fecha_fin_soat = moment(fecha_fin).format('DD/MM/YYYY');

        if(this.vigencia_soat(fecha_ini, fecha_fin)){
          this.vigency = 1;
          this.vehicle.fecha_inicio_soat = fecha_ini;
          this.vehicle.fecha_fin_soat = fecha_fin;
          this.vehicle.soat = 1; 
        }
        else{
          this.vigency = 2;
        } 
      }
      else{
        this.vigency = 3;
      }
      this.loading_soat = false;
    }, 3000)
  }

  data_soat(fecha_ini:any, fecha_fin:any){
    if(this.vigencia_soat(fecha_ini, fecha_fin)){
      this.vigency = 1;
      this.vehicle.fecha_inicio_soat = moment(fecha_ini).format('DD/MM/YYYY');
      this.vehicle.fecha_fin_soat = moment(fecha_fin).format('DD/MM/YYYY');
      this.vehicle.soat = 1; 
    }
    else{
      this.vigency = 2;
    } 
  }

  vigencia_soat(inicio:any, fin:any){
    const fecha_actual = new Date();
    const f1 = new Date(inicio);
    const f2 = new Date(fin)

    if(fecha_actual >= f1 && fecha_actual <= f2){
      return true;
    }
    else{
      return false;
    }
  }

  refreshITV(){
    this.loading = true;
    this.getExternalVehicle(this.vehicle.placa);
  }

  remove(){
    if(this.id == 0){
      this.cleanVehicle();
    }
    else{
      Swal.fire({
        title: "Información",
        text: `¿Esta seguro de quitar el vehículo del conductor?`,
        icon: "warning",
        showCancelButton: true, //
        confirmButtonColor: "#3085d6", // 
        cancelButtonColor: "#d33", // 
        confirmButtonText: "Si, estoy seguro",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this._vehicle.update(this.vehicle.id, {id_conductor : null}).subscribe((res:any)=>{
            Swal.fire('Información', 'Se quitó el vehiculo del conductor de manera exitosa', 'success');
            this.id = 0;
            this.cleanVehicle();
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          return;
        }
      });
    }
  }

  refreshVehicle(){
    this.loadVehicleByDriverId();
  }

  cleanVehicle(){
    this.edit_state = false;
    this.vigency = 0;
    //this.imageTemp = '';

    this.vehicle = {
      id:0,
      placa:'',
      industria:'',
      marca:'',
      modelo:'',
      clase:'',
      tvehiculo:'',
      chasis:'',
      color:'',
      cilindrada:'',
      radicatoria:'',
      itv:'',
      tipo:'',
      img:'',
      soat:0,
      fecha_inicio_soat:'',
      fecha_fin_soat:'',
      propietario:'',
      ci_propietario:'',
      img_propietario:''
    }
  }
}

interface VehicleData {
  id:number;
  placa:string,
  industria:string,
  marca:string,
  modelo:string,
  clase:string,
  tvehiculo:string,
  chasis:string,
  color:string,
  cilindrada:string,
  radicatoria:string,
  itv:string,
  tipo:string,
  img:string,
  soat:number,
  fecha_inicio_soat:string,
  fecha_fin_soat:string,
  propietario:string,
  ci_propietario:string,
  img_propietario:string
}
