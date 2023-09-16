import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
//import swal  from 'sweetalert';
import { AuthService } from '../../services/auth.service';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  usuario:any={
    email:'',
    password:''
  }

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });


  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone,
               private auth:AuthService
               ) { }

  ngOnInit(): void {
    this.renderButton();
  }


  login() {
    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if ( this.loginForm.get('remember').value ){ 
          localStorage.setItem('email', this.loginForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }
        //seteamos el token
        this.auth.setToken(resp.id);

        //seteamos el usuario
        this.auth.setUser(resp);

         //seteamos la data del usuario y navegamos a principal
         this.auth.setUserData(resp.userId);

        // Navegar al Dashboard
        // wait for the last function
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
        }, 1000);

      }, (err) => {
        Swal.fire("Mensaje de Error", "Error, credenciales no válidas", "error");
      });

  }
  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
  }

  // attachSignin(element) {
    
  //   this.auth2.attachClickHandler( element, {},
  //       (googleUser) => {
  //           const id_token = googleUser.getAuthResponse().id_token;
  //           // console.log(id_token);
  //           this.usuarioService.loginGoogle( id_token )
  //             .subscribe( resp => {
  //               // Navegar al Dashboard
  //               this.ngZone.run( () => {
  //                 this.router.navigateByUrl('/');
  //               })
  //             });

  //       }, (error) => {
  //           alert(JSON.stringify(error, undefined, 2));
  //       });
  // }

}
