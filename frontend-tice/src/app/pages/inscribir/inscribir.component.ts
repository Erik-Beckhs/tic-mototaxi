import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,  NgForm} from '@angular/forms';
import { ListsService } from 'src/app/services/lists.service';
import { MatStepper } from '@angular/material/stepper';

import { AsociacionService } from 'src/app/services/asociacion.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
//import { UeducativaService } from '../../services/ueducativa.service';
import { TarjetaService } from '../../services/tarjeta.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImprimirTICEComponent } from '../imprimir-tice/imprimir-tice.component';
//import * as moment from 'moment';

import * as printJS from 'print-js';
import swal from 'sweetalert';


const img = 'https://www.bellavista.cl/static/assets/images/without_image.jpg';

//declare var swal:any


//import { ConductorInterface } from './inscribir.component';

@Component({
  selector: 'app-inscribir',
  templateUrl: './inscribir.component.html',
  styleUrls: ['./inscribir.component.css']
})

export class InscribirComponent implements OnInit {
  //isCompleted:boolean=false;

  completeConductor:boolean=false;
  completeVehiculo:boolean=false;
  
  title = 'app';
  elementType = 'url';
  value:any;

  value2:any;

  driver:any={
    codigo:''
  };
  vehicle:any;

  conductores:any[]=[];
  vehiculos:any[]=[];

  idConductor:any;
  idVehiculo:any;

  registrado:boolean=false;

  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

  imageLoadUser:boolean=true;
  imageTempUser:any;
  imageLoadVehicle:boolean=true;
  imageTempVehicle:any;
  fileUser:any;
  fileVehicle:any;

  //finscripcion:any = new Date();

  today:any = new Date();
  dateNextYear = new Date().setFullYear(this.today.getFullYear()+1);
  hoy:any;
  //fini:any;
  ffin:any;

  //listas
  expediciones:any;
  sindicatos:any;
  tservicios:any;
  tiposangre:any;
  categorias:string[];
  colores:string[]=[];
  pais:string[]=[];
  generos:any;

  ci_aux:any;
  placa_aux:any;
  chasis_aux:any;
  exist:boolean=false

  conductor:any = {
    nombre:'',
    apellidos:'',
    ci:'',
    lugar:'',
    numreg:'',
    tipo_sangre:'',
    id_asociacion:'',
    cat_licencia:'',
    expedicion:'', 
    fotografia:img,
    genero:'',
    codigo:''
  }

  vehiculo:any = {
    procedencia:'',
    color:'',
    tipo:'',
    img:img,
    propietario:''
  };

  card:boolean = false;

  idDriver:any;

  //hoy = Date.now(); 
  //today:any = '';

  @ViewChild('stepper') stepper: MatStepper;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _list:ListsService,
    private _sindicato:AsociacionService,
    private _conductor:ConductorService,
    private _vehiculo:VehiculoService,
    //private _ueducativa:UeducativaService,
    private _tarjeta:TarjetaService,
    private activatedRoute:ActivatedRoute,
    public dialog: MatDialog,
    //public dialogRef: MatDialogRef<any>
    ) {
      this.expediciones=this._list.expediciones;
      
      //this.ueducativas=this._list.ueducativas;

      this.tservicios=this._list.tservicios;
      this.tiposangre = this._list.tsangre;
      this.categorias = this._list.categorias;
      this.colores = this._list.colores;
      this.pais = this._list.pais.sort();
      this.generos = this._list.generos;

      this.fechaActual();

      //this.today = moment(this.hoy).format("DD/MM/YYYY hh:mm A");
      

      //this.sindicatos = this._sindicato.getAsociaciones();
      this.loadSindicatos();
      //this.loadUEducativas();

      this.idDriver = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      this.loadConductor();
      //this.loadVehicu
      this.loadConductores();
      this.loadVehiculos();

      if(this.idDriver != 0){
        this.idConductor = this.idDriver;
        this.exist = true;
      }

    //this.today2 = new Date();
    //console.log(this.today2);

    // this.value2 = `
    // UNIVERSIDAD MAYOR DE SAN ANDRÉS
    // INSTITUTO DE INVESTIGACIONES EN INFORMÁTICA
    // CERTIFICADO CORRESPONDIENTE A: ERIK MAQUERA CAÑASTO
    // CURSO: CUSTOMER RELATIONSHIP MANAGEMENT - ESTRATÉGIAS Y MÉTODOS
    // CÓDIGO: III-4728
    // 2020
    // `
    //         ;
    }

  ngOnInit(): void {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required],
    // });  

  }

  loadConductor(){
    if(this.idDriver !== 0){
      this.getConductorById();
      this.getVehiculoByIdConductor();
    }
  }

  loadConductores(){
    this._conductor.getConductores().subscribe((res:any)=>{
      this.conductores = res;
    })
  }

  loadVehiculos(){
    this._vehiculo.getVehiculos().subscribe((res:any)=>{
      this.vehiculos = res;
      //console.log(this.vehiculos);
    });
  }

  // loadUEducativas(){
  //   this._ueducativa.getUEducativas().subscribe(data=>{
  //     this.ueducativas = data;
  //     //console.log(this.ueducativas);
  //   })
  // }

  getConductorById(){
    this._conductor.getConductorById(this.idDriver).subscribe((res)=>{
      this.conductor = res;
      this.conductor.fecha_nac = new Date(this.conductor.fecha_nac);

      this.ci_aux = this.conductor.ci;
      //console.log(this.conductor.fotografia);
      //this.imageTempUser = this.conductor.fotografia;
      //console.log(this.conductor);
    });
  }

  getVehiculoByIdConductor(){
    this._vehiculo.getVehiculoByIdConductor(this.idDriver).subscribe((res)=>{
      this.vehiculo = res;
      if(this.vehiculo.img == null){
        this.vehiculo.img = img;
      }
      this.placa_aux = this.vehiculo.placa;
      this.chasis_aux = this.vehiculo.chasis;
      this.idVehiculo = this.vehiculo.id;
    })
  }

  /*ngAfterViewInit(): void {
    this.tamQR()
  }*/

  updateImage(){

  }

  fechaActual(){
    //this.hoy = `${this.today.getDate()}/${this.today.getMonth() + 1}/${this.today.getFullYear()}`;
    this.hoy = this.today.toLocaleDateString();
    //this.fini = this.today.toLocaleDateString();
    //this.ffin = `${this.today.getDate()}/${this.today.getMonth() + 1}/${this.today.getFullYear() + 1}`;
    //let timeNextYear = this.today.setFullYear(this.today.getFullYear()+1);
    let ffinDate = new Date(this.dateNextYear);
    this.ffin = ffinDate.toLocaleDateString();
    //this.fin =
  }

  // fechaProximoAnio(){
    //let nextYear
    // let aux = this.today.setFullYear(this.today.getFullYear + 1);
    // let fproximo = new Date(aux);
    // this.ffin = `${fproximo.getDate()}/${fproximo.getMonth()+1}/${fproximo.getFullYear()}`;
  // }

  loadSindicatos(){
    this._sindicato.getAsociaciones().subscribe((res:any)=>{
      this.sindicatos = res;
    })
  }

  onFileChangeUser(event:any) {
    this.fileUser=event.target.files[0];
    if(!event){
      this.fileUser = null
      return ;
    }

    if(this.fileUser.type.indexOf('image') < 0){
      //swal("HANSA Business", "Sólo puede elegir archivos de tipo imagen", "error");
      swal("Dirección Nacional de Transito","Solo puede elegir archivos de tipo imagen", "warning");
      this.fileUser=null;
      return ;
    }

    this.imageLoadUser=this.fileUser;

    let reader = new FileReader();
    let urlImagenTempUser = reader.readAsDataURL(this.fileUser);
    reader.onloadend = ()=>{
      //console.log(reader.result)
      this.imageTempUser = reader.result;
    
      // console.log(typeof this.imageTempUser);
      // console.log(this.imageTempUser);

      this.conductor.fotografia = this.imageTempUser;
      //console.log(typeof this.imageTempUser);
      //console.log(this.imageTempUser);
    }
  }

  imprimir(){
    //printJS('formulario', 'html');
    this.dialog.open(ImprimirTICEComponent, {
      width: '800px',
      data: {
        conductor:this.driver,
        vehiculo:this.vehicle
      }
    });
  }

  onFileChangeVehicle(event:any) {
    this.fileVehicle=event.target.files[0];
    if(!event){
      this.fileVehicle = null
      return ;
    }

    if(this.fileVehicle.type.indexOf('image')<0){
      //swal("HANSA Business", "Sólo puede elegir archivos de tipo imagen", "error");
      swal("Dirección Nacional de Transito","Solo puede elegir archivos de tipo imagen", "warning");
      this.fileVehicle=null;
      return ;
    }

    this.imageLoadVehicle=this.fileVehicle;

    let reader = new FileReader();
    let urlImagenTempVehicle = reader.readAsDataURL(this.fileVehicle);
    reader.onloadend = ()=>{
      //console.log(reader.result)
      this.imageTempVehicle = reader.result;
      this.vehiculo.img = this.imageTempVehicle;
    }
  }

  tamQR(){
    const a = document.querySelector('.aclass');
    a.children[0].classList.add('w-150');
  }

  genera(datosConductor:NgForm, datosVehiculo:NgForm){
    //console.log('conductor');

    this.driver = datosConductor.value;
    this.vehicle = datosVehiculo.value;
    //this.driver.img = this.imageTempUser;
    this.driver.fotografia = this.conductor.fotografia;

    //preguntar si tiene imagen de vehiculo

    // this.vehicle = datosVehiculo.value;
    // this.vehicle.img = this.imageTempVehicle;
    this.vehicle.img = this.vehiculo.img;

    //console.log(this.driver);
    //console.log(this.vehicle);

    this.mostrarTarjeta();

  //this.tamQR();
  }

  mostrarTarjeta(){

    this.card = true;
              this.value = `
                  DIRECCION DE TRANSITO SANTA CRUZ
                  Nombre: ${this.driver.nombres} ${this.driver.apellidos} 
                  Tipo de Sangre: ${this.driver.tipo_sangre}
                  Licencia: ${this.driver.licencia}
                  Categoria: ${this.driver.cat_licencia}
                  placa: ${this.vehicle.placa}
                  VALIDO DEL ${this.hoy} AL ${this.ffin} 
              `
            ;
  }

  async registrar(){
    if(this.idConductor){
      this._conductor.modificaConductor(this.driver, this.idConductor).subscribe(()=>{
        this._vehiculo.modificaVehiculo(this.vehicle, this.idVehiculo).subscribe(()=>{
          swal('Dirección Departamental de Tránsito', 'Se modificó su información de manera correcta', 'success');
          this.registrado = true;

          this.guardaTarjeta(this.idConductor);
        });
      });
    }
    else{
      // const a = await this.generaCodigoConductor();
      // const b = await this.generaCodigoVehiculo();

      this._conductor.registraConductor(this.driver).subscribe((data:any)=>
        {
        console.log('Se registró al conductor');
  
        this.vehicle.id_conductor = data.id;
  
        this._vehiculo.guardarVehiculo(this.vehicle).subscribe((dataV:any)=>{
          console.log('Se registró el vehiculo');
           swal("Dirección Departamental de Tránsito", "Se registró su información", "success").then(()=>{
                this.registrado = true;
                this.idConductor = data.id;
                this.idVehiculo = dataV.id;

                this.guardaTarjeta(this.idConductor);
                //console.log(data);
            })
          })
        })
    }
  }

  guardaTarjeta(idConductor:any){
    let tice = {
      id_conductor:idConductor,
      fecha_inicio:this.today,
      fecha_fin:this.dateNextYear
    }
    this._tarjeta.saveCard(tice).subscribe(()=>console.log('Se registró la tarjeta'));
    //llamada a servicio
  }

  anteriorTice(){
    this.card = false;
    this.registrado = false;
    this.stepper.previous();
  }

  next1(driver:NgForm){

    if(this.idConductor){
      if(driver.value.ci !== this.ci_aux){
        const aux = this.conductores.find(conductor => conductor.ci === driver.value.ci);
        if(aux){
          swal('Dirección Departamental de Transporte Santa Cruz', `La cedula ${driver.value.ci} ya existe`, 'warning');
          return;
        }
      }
    }
    else{
        const aux = this.conductores.find(conductor => conductor.ci === driver.value.ci);
        if(aux){
          swal('Dirección Departamental de Transporte Santa Cruz', `La cedula ${driver.value.ci} ya existe`, 'warning');
          return;
        }
    }

    if(this.conductor.fotografia.indexOf('https') == 0)
    {
      swal('Direccion Departamental de Tránsito', 'Debe subir la imagen del conductor', 'warning');
      return ;
    }
    else{
      this.vehiculo.propietario = `${this.conductor.nombres} ${this.conductor.apellidos}`;
      this.stepper.next();
    }
  }

  next2(vehiculo:NgForm){

    if(this.vehiculo.img.indexOf('https', 0)){
      vehiculo.value.img = this.vehiculo.img;
    }

    if(this.idConductor){
      if(this.placa_aux !== vehiculo.value.placa){
        const aux = this.vehiculos.find(vehicle=>vehicle.placa === vehiculo.value.placa);
        if(aux){
          swal('Dirección Departamental de Santa Cruz', `La placa ${vehiculo.value.placa} ya existe`, 'warning');
          return;
        }
      }
      if(this.chasis_aux !== vehiculo.value.chasis){
        const aux = this.vehiculos.find(vehicle=>vehicle.chasis === vehiculo.value.chasis);
        if(aux){
          swal('Dirección Departamental de Santa Cruz', `Ya existe un vehículo con el chasis ${vehiculo.value.chasis}`, 'warning');
          return;
        }
      }
    }
    else{
      const aux = this.vehiculos.find(vehicle=>vehicle.placa === vehiculo.value.placa);
      if(aux){
        swal('Dirección Departamental de Santa Cruz', `La placa ${vehiculo.value.placa} ya existe`, 'warning');
        return;
      }
      const aux2 = this.vehiculos.find(vehicle=>vehicle.chasis === vehiculo.value.chasis);
      if(aux2){
        swal('Dirección Departamental de Santa Cruz', `Ya existe un vehículo con el chasis ${vehiculo.value.chasis}`, 'warning');
        return;
      }
    }
    this.stepper.next();
    
  }

  async generaCodigoConductor(){
    try{
      this._conductor.lastID().subscribe((data:any)=>{
        let val = parseInt(data.id) + 1;
        let codigo = ('00' + val).slice(-3);
        console.log('codigo generado')
        this.conductor.codigo =  `COND-${codigo}`;
        this.driver.codigo = this.conductor.codigo;
      })
    }
    catch(e){
      throw e
    }
  }

  async generaCodigoVehiculo(){
    try{
      this._vehiculo.lastID().subscribe((data:any)=>{
        let val = parseInt(data.id) + 1;
        let codigo = ('0000' + val).slice(-5);
        //console.log('codigo obtenido'+codigo);
        this.vehiculo.codigo =  `V-${codigo}`;
        this.vehicle.codigo = this.vehiculo.codigo;
      })
    }
    catch(e){
      throw e;
    }
  }
}

export class Conductor{
  id?:number;
  ci?:number;
  expedicion?:string;
  nombre?:string;
  apellidos?:string;
  fecha_nac?:object;
  tsangre?:string;
  nacionalidad?:string;
  direccion?:string;
  img?:string;
  codigo?:string;
  sindicato?:number;
  //ueducativa?:number;
  licencia?:string;
  categoria?:string;
}