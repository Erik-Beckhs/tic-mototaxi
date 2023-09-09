import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const base_external = environment.base_external;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  constructor(private http:HttpClient) { 

  }

  token:string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaXNzIjoiYnhBRmlzVEJzcmM5NXdLWFdJcDNISHFIQmtTOTExZ2EifQ.QwdVtQlfwIGPYnul_rHdwlJNCrIWPhtBGghWml1gYXQ';
  headers = new HttpHeaders().set(
    'Authorization', `Bearer ${this.token}`
  )

  getVehicle(placa:string){
    let url= `${base_url}/vehiculos/getExternalData`;
    return this.http.post(url, {dato:placa});
  }
}
