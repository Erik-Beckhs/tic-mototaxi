import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  constructor(private http:HttpClient) { 

  }

  save(item:any){
    let url = `${base_url}/conductores`;
    return this.http.post(url, item);
  }

  update(id:number, item:any, ){
    let url = `${base_url}/conductores/${id}`;
    return this.http.patch(url, item);
  }

  getConductores(){
      let url = `${base_url}/conductores?filter[include]=asociacion&filter[include]=vehiculos`;
      return this.http.get(url);
  }

  // getConductoresInfoGral(){
  //   let url = `${base_url}/conductores/ListadoDeConductores`;
  //   return this.http.get(url);
  // }

  deleteConductor(id:any){
    let url = `${base_url}/conductores/${id}`;
    return this.http.delete(url);
  }

  getConductorById(id:any){
    let url = `${base_url}/conductores/${id}?filter[include]=vehiculos`;
    return this.http.get(url);
  }
  
  getLastID(){
    let url = `${base_url}/conductores/ultimoID`;
    return this.http.get(url)
    .pipe(map(
      data=>data[0]
    ))
  }

  getCountDriversByGenero(){
    let url= `${base_url}/conductores/countByGenero`;
    return this.http.get(url);
  }

  getDriversByIdUnion(id:number){
    let url= `${base_url}/conductores?filter[include]=asociacion&filter[include]=vehiculos&filter[where][id_asociacion]=${id}`;
    return this.http.get(url);

    // return Api().get(`/servicios/${id}?filter[include]=formas_pago&filter[include]=horarios`);
  }

  getDriverByCi(cedula:number){
    let url = `${base_url}/conductores?filter[where][ci]=${cedula}`;
    return this.http.get(url);
  }
}
