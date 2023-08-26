import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor(private http:HttpClient) {

   }

   getCardsByMonth(){
     let url = `${base_url}/tarjetas/countTarjetaMes`;
     return this.http.get(url);
   }

   saveCard(tice:any){
     let url = `${base_url}/tarjetas`;
     return this.http.post(url, tice);
   }
}
