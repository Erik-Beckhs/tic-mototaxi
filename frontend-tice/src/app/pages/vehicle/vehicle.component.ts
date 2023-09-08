import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';



@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  id:number;
  vehicle:any={}

  constructor(
    private activatedRoute:ActivatedRoute,
    private _vehicle:VehiculoService
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id != 0){
      this.loadVehicle();
    }
  }

  asignaId(value:number){

  }

  reload(){
    this.loadVehicle();
  }

  loadVehicle(){
    this._vehicle.getVehicle(this.id).subscribe((res:any)=>{
      console.log(res);
    })
  }
}
