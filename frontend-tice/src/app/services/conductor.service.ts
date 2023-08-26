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

  registraConductor(conductor:any){
    let url = `${base_url}/conductores`;
    return this.http.post(url, conductor);
  }

  modificaConductor(conductor:any, idConductor:string){
    let url = `${base_url}/conductores/${idConductor}`;
    return this.http.patch(url, conductor);
  }

  getConductores(){
      let url = `${base_url}/conductores`;
      return this.http.get(url);
  }

  getConductoresInfoGral(){
    let url = `${base_url}/conductores/ListadoDeConductores`;
    return this.http.get(url);
  }

  deleteConductor(id:any){
    let url = `${base_url}/conductores/${id}`;
    return this.http.delete(url);
  }

  getConductorById(id:any){
    let url = `${base_url}/conductores/${id}`;
    return this.http.get(url);
  }
  
  lastID(){
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
}
