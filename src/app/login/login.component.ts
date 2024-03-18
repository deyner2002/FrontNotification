import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  
  
  loginForm=this.formBuilder.group({
    email:['', [Validators.required,Validators.email]],
    password:['', Validators.required]
  })
  constructor(private formBuilder:FormBuilder, private router:Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.logout();
  }

  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    const credentials = {
      email: this.loginForm.value.email+"",
      password: this.loginForm.value.password+""
    };
    this.authenticationService.login(credentials).subscribe(
      response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('expiresIn', response.expiresIn);
        localStorage.setItem('tokenType', response.tokenType);
        this.router.navigateByUrl('dashboard');
      this.loginForm.reset();
      },
      error => {
        console.error('Error al iniciar sesión:', error);
        this.loginForm.markAllAsTouched();
        alert("Error al ingresar los datos")
      }
    );
  }
}
