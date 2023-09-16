import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { JsonPipe } from '@angular/common';
import { AuthService } from './auth.service';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public user:any;

  constructor( private http: HttpClient, 
                private router: Router,
                private ngZone: NgZone,
                private _auth:AuthService
                //private headers:HttpHeaders
                ) {
  }

  logout() {
    localStorage.removeItem('current_user');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false) )
    );

  }

  crearUsuario( formData: RegisterForm ) {
    
    return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token )
                })
              )

  }

  login( formData: LoginForm ) {
    
    return this.http.post(`${ base_url }/Users/login?include=user`, formData )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.id )
                  })
                );

  }

  loginGoogle( token ) {
    
    return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token )
                  })
                );

  }

  getUserData(){
    this.user = this._auth.getCurrentUser();
    return this.http.get(`${base_url}/users_data/getUserCustom?id=${this.user.userId}`)
    .pipe(
      map(res=>res[0])
    )
  }

  updateUserData(id:number, data:any){
    let url = `${base_url}/users_data/${id}`
    return this.http.patch(url, data);
  }

  getUsers(){
    let url = `${base_url}/users_data/users_list`
    return this.http.get(url);
  }

  deleteUser(id:number){
    let url = `${base_url}/users_data/${id}`;
    return this.http.delete(url);
  }

  createUser(data:any){
    let url = `${base_url}/users_data`;
    return this.http.post(url, data);
  }

  deleteUserPrincipal(id:number){
    let url = `${base_url}/users_data/deleteUser?id=${id}`;
    return this.http.delete(url);
  }
}
