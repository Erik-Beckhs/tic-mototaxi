import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  constructor(private http:HttpClient) { }

  getOwners(){
    let url = `${base_url}/propietarios?filter[include]=vehiculos`;
    return this.http.get(url);
}

}
