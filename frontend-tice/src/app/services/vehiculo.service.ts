import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http:HttpClient) { 

  }

  guardarVehiculo(vehiculo:any){
    let url = `${base_url}/vehiculos`;
    return this.http.post(url, vehiculo);
  }

  modificaVehiculo(vehiculo:any, idVehiculo){
    let url = `${base_url}/vehiculos/${idVehiculo}`;
    return this.http.patch(url, vehiculo);
  }

  countPlaca(placa:string){
    let url = `${base_url}/vehiculos/count?where={"placa":"${placa}"}`;
    return this.http.get(url);
  }

  countChasis(chasis:string){
    let url = `${base_url}/vehiculos/count?where={"chasis":"${chasis}"}`;
    return this.http.get(url);
  }

  lastID(){
    let url = `${base_url}/vehiculos/ultimoID`;
    return this.http.get(url).pipe(map((data)=>{
      return data[0];
    }));
  }

  getVehiculoByIdConductor(idConductor:any){
    let url = `${base_url}/conductores/${idConductor}/vehiculos`;
    return this.http.get(url).pipe(map(
      (data)=>{
        return data[0];
      }
    ))
  }

  getVehiculos(type:number){
    let conditions = '}';
    if(type==1){
    }
    else if(type==2){
      conditions = `,"where":{"id_conductor":null}}`;
    }
    else{
      conditions = `,"where":{"id_propietario":null}}`;
    }
      let url = `${base_url}/vehiculos?filter={"include":[{"relation":"conductor"},{"relation":"propietario"}]${conditions}`;
      //console.log(url);
      return this.http.get(url);
  }

  

  getVehiculosByTService(){
    let url = `${base_url}/vehiculos/cantTipoServ`;
    return this.http.get(url);
  }

  getVehicle(id:number){
    let url = `${base_url}/vehiculos/${id}`;
    return this.http.get(url);
  }

  getLastId(){
    let url = `${base_url}/vehiculos?filter[order]=id%20DESC`;
    return this.http.get(url).pipe(
      map(data=>data[0])
    )
  }

  getVehicleByDriverId(driverId:any){
    let url = `${base_url}/vehiculos?filter[where][id_conductor]=${driverId}`;
    return this.http.get(url);
  }
}
