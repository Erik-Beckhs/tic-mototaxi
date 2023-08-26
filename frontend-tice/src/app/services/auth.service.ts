import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { throwError } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any;

  constructor(
    private http:HttpClient
    ) { 
    
  }

  // registerUser(user:any){
  //   let url = ``;
  //   return this.http.post(url, user);
  // }

  login(user:any){
    let url = `${base_url}/Users/login?include=user`;
    return this.http.post(url, user)
    .pipe(map(data=>data));
  }

  setUser(user){
    let user_string = JSON.stringify(user);
    localStorage.setItem('current_user', user_string);  
  }

  setToken(token:any){
    //let token_string = JSON.stringify(token)
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getCurrentUser(){
    const a = localStorage.getItem('current_user');

    if(a !== null){
      this.user = JSON.parse(a);
    }
    return this.user;
  }

  logout(){
    //let token = this.getToken()
    //let url = `${base_url}/Users/logout?access_token=${token}`;
    //localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    //return this.http.post(url, {headers:this.headers});
  }

  updateUser(id:number, data:any){
    let url = `${base_url}/Users/${id}?access_token=${this.getToken()}`;
    return this.http.patch(url, data);
  }

  changePassword(oldPassword: string, newPassword:string){
    let url = `${base_url}/Users/change-password/?access_token=${this.getToken()}`;
    return this.http.post(url, {oldPassword, newPassword})
    .pipe(map(data=>data));
  }

  // deleteUser(id:string){
  //   let url = `${base_url}/Users/${id}?access_token=${this.getToken()}`;
  //   return this.http.delete(url);
  // }

  createUser(data:any){
    let url = `${base_url}/Users/?access_token=${this.getToken()}`;
    return this.http.post(url, data);
  }
}
