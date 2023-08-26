import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService,
               private router: Router,
               private auth:AuthService
               ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // return this.usuarioService.validarToken()
      //   .pipe(
      //     tap( estaAutenticado =>  {
      //       if ( !estaAutenticado ) {
      //         this.router.navigateByUrl('/login');
      //       }
      //     })
      //   );
      const token = localStorage.getItem('token');
      if(token !== null){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        //return false;
      }
  }
  
}
