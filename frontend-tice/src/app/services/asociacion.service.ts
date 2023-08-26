import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsociacionService {

  //notificacion
  //notificacion = new EventEmitter<any>();

  constructor(private http:HttpClient) {
 
  }

  saveAsoc(asociacion:any){
    let url = `${base_url}/asociaciones`;
    return this.http.post(url, asociacion);
  }

  getAsociaciones(){
    let url=`${base_url}/asociaciones`;
    return this.http.get(url);
  }

  getAsociacionById(id:any){
     let url = `${base_url}/asociaciones/${id}`;
     return this.http.get(url);       
  }

  updateImage(id:any, file:any){
    let url = `${base_url}/asociaciones/${id}`;
    return this.http.patch(url, file);
  }

  deleteAsociacion(idAsoc:any){
    let url = `${base_url}/asociaciones/${idAsoc}`;
    return this.http.delete(url)
  }

  updateAsociacion(id:any, asociacion:any){
    let url = `${base_url}/asociaciones/${id}`;
    return this.http.patch(url, asociacion);
  }
}
