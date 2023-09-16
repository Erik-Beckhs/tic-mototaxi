import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AntecedentesService {
  headers:HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json'
  })

  notificacion = new EventEmitter<any>()

  constructor(private http:HttpClient) { }

  // deleteByIdDriver(idConductor:any){
    
  //   //alert('desde service:'+idConductor)
  //   //return;
  //   let objeto = {
  //     idConductor
  //   }
  //   // console.log(idConductor);
  //   // return;
  //   let url = `${base_url}/antecedentess/antecedenteConductor`;
  //   return this.http.post(url, objeto, { headers:this.headers});
  // }

  getAntecedentesById(idConductor:any){
    let url = `${base_url}/conductores/${idConductor}/antecedentes?filter[include]=created_by`;
    return this.http.get(url);
  }

  createAntecedente(antecedente:any){
    let url = `${base_url}/antecedentess`;
    return this.http.post(url, antecedente);
  }

  delete(id:any){
    let url = `${base_url}/antecedentess/${id}`;
    return this.http.delete(url);
  }

  getLastId(){
    let url = `${base_url}/antecedentess?filter[order]=id%20DESC`;
    return this.http.get(url).pipe(
      map(data=>data[0])
    )
  }

  update(id:number, body:any){
    let url = `${base_url}/antecedentess/${id}`;
    return this.http.patch(url, body);
  }
}
