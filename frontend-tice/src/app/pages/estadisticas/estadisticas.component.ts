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
  data1:any[]=[];
  months:any[]=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

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

  labels3: string[] = [];
  data3:any = [];

  //cantidad de conductores por ue
  data4:any[]=[];
  labels4:any[]=[];

  constructor(
    private _tarjeta:TarjetaService,
    //private _ueducativa:UeducativaService,
    private _driver:ConductorService,
    private _vehicle:VehiculoService
    ) {
      //this.loadDrivers();
    }

  ngOnInit(): void {
    this.loadDriversByGender();
    this.loadVehiclesByType();
    this.loadMonthData();
  }

  loadMonthData(){
    this._tarjeta.getCardsByMonth().subscribe((data:any)=>{
      console.log(data);
      data.forEach((element:any) => {
        //this.meses.push(mes);
        this.data1.push(element.cantidad);
      });
    })
  }

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

  // loadDrivers(){
  //   this._driver.getConductores().subscribe((res:any)=>{
  //   })
  // }

  loadVehiclesByType(){
    this._vehicle.getVehiculosByTService().subscribe((res:any)=>{
      //console.log(res);
      if(!!res){
        res.forEach(element => {
          const {tvehiculo, cantidad} = element;
          this.labels2.push(tvehiculo);
          this.data2.push(cantidad);
        });
      }
    })
  }

  loadDriversByGender(){
    this._driver.getCountDriversByGender().subscribe((res:any)=>{
      if(!!res){
        res.forEach((element:any) => {
          const {genero, cantidad} = element;
          this.labels3.push(genero);
          this.data3.push(cantidad);
        });
      }
    })
  }
}
