import { Component, OnInit } from '@angular/core';
import { ConductorService } from 'src/app/services/conductor.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { TarjetaService } from '../../services/tarjeta.service';
//import { UeducativaService } from '../../services/ueducativa.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  year:any=new Date().getFullYear();
  dataMonth:any[]=[102, 95, 115, 116, 100];
  meses:any[]=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];

  conductores:any;

  // labels1: string[] = ['1ero de Mayo', 'Eduardo Avaroa', '24 de Septiembre', 'El Camba Tours', 'German Busch', 'Jaguares'];
  // data1:any = [
  //   10, 15, 40, 52, 22, 16
  // ];

  // labels2: string[] = ['Bus Escolar', 'Minibus', 'Taxi', 'Otros'];
  // data2:any = [
  //   40, 30, 12, 25
  // ];

  labels2: string[] = [];
  data2:any = [];

  labels3: string[] = ['Femenino', 'Masculino'];
  data3:any = [32, 244];

  //cantidad de conductores por ue
  data4:any[]=[];
  labels4:any[]=[];

  constructor(
    private _tarjeta:TarjetaService,
    //private _ueducativa:UeducativaService,
    private _conductor:ConductorService,
    private _vehiculo:VehiculoService
    ) {
      this.loadDrivers();
     }

  ngOnInit(): void {
    //this.loadDataAndMonth();
    //this.loadCountDrivers();
    //this.loadDriversByGenero();
    this.loadVehiclesByType();
    //this.loadDrivers();
  }

  // loadDataAndMonth(){
  //   this._tarjeta.getCardsByMonth().subscribe((data:any)=>{
  //     data.forEach(element => {

  //       const {mes, cantidad} = element;

  //       this.meses.push(mes);
  //       this.data.push(cantidad);
  //     });
  //   })
  // }

  // loadCountDrivers(){
  //   this._ueducativa.getCountDriversByUE().subscribe((data:any)=>{
  //     data.forEach(element => {
  //       const {cantidad, nombre} = element;
  //       this.data4.push(cantidad);
  //       this.labels4.push(nombre);
  //     });
  //     console.log(this.data3);
  //   })
  // }

  // loadDriversByGenero(){
  //   this._conductor.getCountDriversByGenero().subscribe((res:any)=>{
  //     //console.log(res);
  //     res.forEach(element => {
  //       this.data3.push(element.cantidad);
  //     });
  //   });
  // }

  loadDrivers(){
    this._conductor.getConductores().subscribe((res:any)=>{
      //this.conductores = res;
      //this.labels3.push()
      
      //console.log(this.conductores);
    })
  }

  loadVehiclesByType(){
    this._vehiculo.getVehiculosByTService().subscribe((res:any)=>{
      //console.log(res);
      res.forEach(element => {
        const {tipo, cantidad} = element;
        this.labels2.push(tipo);
        this.data2.push(cantidad);
      });
    })
  }

}
